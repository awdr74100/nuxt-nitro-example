import { Product } from '@/server/models/Product';

export default defineEventHandler(async (e) => {
  try {
    const { id } = e.context.params as { id: string };

    const product = await Product.findByIdAndDelete(id).lean();

    if (!product) throw new Error('product not found');

    return { success: true, message: 'deleted' };
  } catch (error) {}
});
