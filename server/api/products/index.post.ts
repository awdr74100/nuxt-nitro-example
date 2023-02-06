import { type IProduct, Product } from '@/server/models/Product';
import isLength from 'validator/es/lib/isLength';

export default defineEventHandler(async (e) => {
  try {
    const { title, price } = await readBody<IProduct>(e);

    if (!isLength(title, { min: 1, max: 24 })) throw new Error('invalid title');
    if (!Number.isInteger(price) || price <= 0)
      throw new Error('invalid price');

    await Product.create({ title, price });

    return { success: true, message: 'created' };
  } catch (error) {}
});
