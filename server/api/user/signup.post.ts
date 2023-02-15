import { z } from 'zod';
import { hash } from 'argon2';

const bodySchema = z.object({
  name: z.string().min(3).max(14),
  email: z.string().email(),
  password: z.string().min(6).max(14),
});

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { name, email, password } = await bodySchema.parseAsync(body);

    const hashedPassword = await hash(password);

    const prisma = usePrismaClient();

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return { success: true };
  } catch (error) {
    return { success: false };
  }
});
