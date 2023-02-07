import Joi from 'joi';
import mongoose from 'mongoose';

export default (error: unknown) => {
  let message = 'Internal Server Error';

  if (error instanceof Joi.ValidationError) {
    message = error.message;
  }

  if (error instanceof mongoose.Error.ValidationError) {
    message = error.message;
  }

  if (error instanceof Error) {
    message = error.message;
  }

  return message;
};
