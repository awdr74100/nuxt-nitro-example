import { type IUser, User } from '@/server/models/User';
import isLength from 'validator/es/lib/isLength';
import isEmail from 'validator/es/lib/isEmail';
import { hash } from 'argon2';

export default defineEventHandler(async (e) => {
  try {
    const { name, email, password } = await readBody<IUser>(e);

    if (!isLength(name, { min: 1, max: 12 })) throw new Error('invalid name');
    if (!isEmail(email)) throw new Error('invalid email');
    if (!isLength(password, { min: 8 })) throw new Error('invalid password');

    const hashedPassword = await hash(password);

    await User.create({ name, email, password: hashedPassword });

    return { success: true };
  } catch (error) {}
});
