import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

export interface IUser {
  name: string;
  email: string;
  password: string;
  tokenVersion: number;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    tokenVersion: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.plugin(uniqueValidator, { type: 'mongoose-unique-validator' });

export const User = model<IUser>('User', userSchema);
