import { type IUser, User } from '@/server/models/User';
import Joi from 'joi';
import argon2 from 'argon2';

const schema = Joi.object<Pick<IUser, 'email' | 'password'>>({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,16}$')),
});

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { email, password } = await schema.validateAsync(body);

    const user = await User.findOne({ email }).lean();

    if (!user) throw new Error('User not found');

    const isMatch = await argon2.verify(user.password, password);

    if (!isMatch) throw new Error('Incorrect password');

    const accessToken = await createToken({ id: user._id }, '15m');
    const refreshToken = await createToken(
      { id: user._id, tokenVersion: user.tokenVersion },
      '4h',
    );

    return { success: true, accessToken, refreshToken };
  } catch (error) {
    return { success: false, message: createErrorMessage(error) };
  }
});
