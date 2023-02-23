import { z } from 'zod';
import type { Role } from '@prisma/client';

export default defineEventHandler(async (event) => {
  const bodySchema = z.object({
    title: z.string().min(3).max(16).optional(),
    price: z.number().int().gte(0).finite().optional(),
  });

  const paramsSchema = z.object({
    id: z.string(),
  });

  try {
    const user = await useAuth<{ role: Role }>(event);

    if (user.role !== 'ADMIN') throw new Error();

    const params = getRouterParams(event);
    const { id } = await paramsSchema.parseAsync(params);

    const body = await readBody(event);
    const { title, price } = await bodySchema.parseAsync(body);

    if (!title && !price) throw new Error(); // avoid operate database

    const prisma = usePrismaClient();

    const product = await prisma.product.update({
      where: { id },
      data: { title, price },
    });

    if (!product) throw new Error();

    return { success: true, message: '商品修改成功' };
  } catch (error) {
    return { success: false };
  }
});
