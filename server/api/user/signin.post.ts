import { z } from 'zod';
import { verify } from 'argon2';
import ms from 'ms';

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(14),
});

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { email, password } = await bodySchema.parseAsync(body);

    const prisma = usePrismaClient();

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) throw new Error('Oops');

    const isMatch = await verify(user.password, password);

    if (!isMatch) throw new Error('Oops');

    const [accessToken, refreshToken] = await Promise.all([
      signAccessToken({ id: user.id }, '15m'),
      signRefreshToken({ id: user.id, tokenVersion: user.tokenVersion }, '4h'),
    ]);

    setCookie(event, 'accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: ms('15m') / 1000,
      path: '/',
    });
    setCookie(event, 'refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: ms('4h') / 1000,
      path: '/api/user/refresh_token',
    });

    return { success: true };
  } catch (error) {
    return { success: false };
  }
});
