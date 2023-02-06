import { type IProduct, Product } from '@/server/models/Product';

export default defineEventHandler(async (e) => {
  try {
    const { id } = e.context.params as { id: string };
    const { title, price } = await readBody<Partial<IProduct>>(e);

    const product = await Product.findByIdAndUpdate(id, {
      title,
      price,
    }).lean();

    if (!product) throw new Error('product not found');

    return { success: true, message: 'updated' };
  } catch (error) {}
});
