import Joi from 'joi';
import mongoose from 'mongoose';

export default (error: unknown) => {
  if (error instanceof Joi.ValidationError) return error.message;

  if (error instanceof mongoose.Error.ValidationError) {
    if (error.errors?.email.kind === 'unique') return '信箱已被使用';

    return error.message;
  }

  if (error instanceof Error) {
    if (error.message === 'custom/USER_NOT_FOUND') return '帳號或密碼錯誤';

    if (error.message === 'custom/INCORRECT_PASSWORD') return '帳號或密碼錯誤';

    return error.message;
  }

  return '伺服器內部出現錯誤';
};
