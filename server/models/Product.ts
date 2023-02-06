import { Schema, model } from 'mongoose';

export interface IProduct {
  title: string;
  price: number;
}

const productSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Product = model<IProduct>('Product', productSchema);
