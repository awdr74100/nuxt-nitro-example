import type { User } from '@prisma/client';
import { date, z } from 'zod';
import { verify } from 'argon2';

export default defineEventHandler(async (event) => {
  const bodySchema = z.object({
    usernameOrEmail: z.string(),
    password: z.string().trim().min(6).max(14),
  });

  try {
    const body = await readBody(event);
    const { usernameOrEmail, password } = await bodySchema.parseAsync(body);

    const result = await z.string().email().safeParseAsync(usernameOrEmail);

    const prisma = usePrismaClient();

    const user = await prisma.user.findUnique({
      where: { [result.success ? 'email' : 'username']: usernameOrEmail },
    });

    if (!user) throw new Error();

    const isMatch = await verify(user.password, password);

    if (!isMatch) throw new Error();

    const [accessToken, refreshToken] = await Promise.all([
      signAccessToken(
        {
          id: user.id,
          role: user.role,
        },
        '15m',
      ),
      signRefreshToken(
        {
          id: user.id,
          role: user.role,
          version: user.activeRefreshTokenVersion,
        },
        '4h',
      ),
    ]);

    setCookie(event, 'accessToken', accessToken, {
      // httpOnly: true,
      // secure: true,
      // sameSite: 'strict',
      path: '/',
      maxAge: 60 * 15,
    });
    setCookie(event, 'refreshToken', refreshToken, {
      // httpOnly: true,
      // secure: true,
      // sameSite: 'strict',
      path: '/api/auth/refresh_token',
      maxAge: 60 * 60 * 4,
    });

    const {
      password: _,
      activeRefreshTokenVersion: __,
      ...filteredUser
    } = user;

    return { success: true, message: '登入成功', user: filteredUser };
  } catch (error) {
    console.log(error);

    return { success: false };
  }
});
