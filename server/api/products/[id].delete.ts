import { z } from 'zod';
import type { Role } from '@prisma/client';

export default defineEventHandler(async (event) => {
  const paramsSchema = z.object({
    id: z.string(),
  });

  try {
    const user = await useAuth<{ role: Role }>(event);

    if (user.role !== 'ADMIN') throw new Error();

    const params = getRouterParams(event);
    const { id } = await paramsSchema.parseAsync(params);

    const prisma = usePrismaClient();

    const product = await prisma.product.delete({ where: { id } });

    if (!product) throw new Error();

    return { success: true, message: '商品刪除成功' };
  } catch (error) {
    return { success: false };
  }
});
