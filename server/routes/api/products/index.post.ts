import { z } from 'zod';
import type { Role } from '@prisma/client';

export default defineEventHandler(async (event) => {
  const bodySchema = z.object({
    title: z.string().min(3).max(16),
    price: z.number().int().gte(0).finite(),
  });

  try {
    const user = await useAuth<{ role: Role }>(event);

    if (user.role !== 'ADMIN') throw new Error();

    const body = await readBody(event);
    const { title, price } = await bodySchema.parseAsync(body);

    const prisma = usePrismaClient();

    await prisma.product.create({
      data: { title, price },
    });

    return { success: true, message: '商品新增成功' };
  } catch (error) {
    return { success: false };
  }
});
