import { type IUser, User } from '@/server/models/User';
import isEmail from 'validator/es/lib/isEmail';
import isLength from 'validator/es/lib/isLength';
import { verify } from 'argon2';
import generateToken from '@/server/utils/generateToken';

export default defineEventHandler(async (e) => {
  try {
    const { email, password } = await readBody<Omit<IUser, 'name'>>(e);

    if (!isEmail(email)) throw new Error('invalid email');
    if (!isLength(password, { min: 8 })) throw new Error('invalid password');

    const user = await User.findOne({ email }).lean();

    if (!user) throw new Error('user not found');

    const passwordMatch = await verify(user.password, password);

    if (!passwordMatch) throw new Error('incorrect password');

    const accessToken = generateToken({ id: user._id, name: user.name }, '2h');

    return { success: true, accessToken };
  } catch (error) {}
});
