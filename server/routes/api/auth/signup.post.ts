import { z } from 'zod';
import { hash } from 'argon2';

export default defineEventHandler(async (event) => {
  const bodySchema = z.object({
    email: z.string().trim().email(),
    username: z.string().trim().min(6).max(14),
    password: z.string().trim().min(6).max(14),
  });

  try {
    const body = await readBody(event);
    const { email, username, password } = await bodySchema.parseAsync(body);

    const hashedPassword = await hash(password);

    const prisma = usePrismaClient();

    await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });

    return { success: true, message: '註冊成功' };
  } catch (error) {
    return { success: false };
  }
});
