import { type IUser, User } from '@/server/models/User';
import Joi from 'joi';
import argon2 from 'argon2';
import ms from 'ms';

const schema = Joi.object<Pick<IUser, 'email' | 'password'>>({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,14}$')).required(),
});

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { email, password } = await schema.validateAsync(body);

    const user = await User.findOne({ email }).lean();

    if (!user) throw new Error('custom/USER_NOT_FOUND');

    const isMatch = await argon2.verify(user.password, password);

    if (!isMatch) throw new Error('custom/INCORRECT_PASSWORD');

    const [accessToken, refreshToken] = await Promise.all([
      createToken({ id: user._id }, ms('15m')),
      createToken({ id: user._id, tokenVersion: user.tokenVersion }, ms('4h')),
    ]);

    setCookie(event, 'accessToken', accessToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
      maxAge: ms('15m'),
      path: '/',
    });
    setCookie(event, 'refreshToken', refreshToken, {
      secure: true,
      httpOnly: true,
      sameSite: 'strict',
      maxAge: ms('4h'),
      path: '/api/user/refresh',
    });

    return { success: true, message: '登入成功' };
  } catch (error) {
    return { success: false, message: createErrorMessage(error) };
  }
});
