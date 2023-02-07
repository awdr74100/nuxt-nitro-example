import { type IUser, User } from '@/server/models/User';
import Joi from 'joi';
import argon2 from 'argon2';

const schema = Joi.object<Pick<IUser, 'name' | 'email' | 'password'>>({
  name: Joi.string().alphanum().min(3).max(12).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,16}$')).required(),
});

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { name, email, password } = await schema.validateAsync(body);
    
    const hashedPassword = await argon2.hash(password);
    const tokenVersion = 0;

    await User.create({ name, email, password: hashedPassword, tokenVersion });

    return { success: true };
  } catch (error) {
    return { success: false, message: createErrorMessage(error) };
  }
});
