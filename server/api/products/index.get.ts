import { Product } from '@/server/models/Product';

export default defineEventHandler(async (e) => {
  try {
    const { sortBy, order } = getQuery(e);

    let query = Product.find().lean();

    if (sortBy === 'price' && (order === 'asc' || order === 'desc')) {
      query = query.sort({ [sortBy]: order === 'asc' ? 'asc' : 'desc' });
    }

    const products = await query;

    return { success: true, products };
  } catch (error) {}
});
