import Joi from 'joi';
import mongoose from 'mongoose';
import jwt from 'fast-jwt';

export default (error: unknown) => {
  if (error instanceof Joi.ValidationError) {
    return error.message;
  }

  if (error instanceof mongoose.Error.ValidationError) {
    if (error.errors?.email.kind === 'unique') return '信箱已被使用';

    return error.message;
  }

  if (error instanceof jwt.TokenError) {
    if (error.code === 'FAST_JWT_EXPIRED') return '令牌已過期';

    if (error.code === 'FAST_JWT_INVALID_SIGNATURE') return '令牌簽名無效';

    if (error.code === 'FAST_JWT_MALFORMED') return '令牌格式錯誤';

    return error.message;
  }

  if (error instanceof Error) {
    if (error.message === 'custom/USER_NOT_FOUND') return '帳號或密碼錯誤';

    if (error.message === 'custom/INCORRECT_PASSWORD') return '帳號或密碼錯誤';

    return error.message;
  }

  return '伺服器內部出現錯誤';
};
