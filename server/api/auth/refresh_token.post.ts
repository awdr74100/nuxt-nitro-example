export default defineEventHandler(async (event) => {
  try {
    const { id, version } = await verifyRefreshToken<{
      id: string;
      version: number;
    }>(getCookie(event, 'refreshToken') || '');

    const prisma = usePrismaClient();

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) throw new Error();

    if (user.activeRefreshTokenVersion !== version) throw new Error();

    await prisma.user.update({
      where: { id },
      data: { activeRefreshTokenVersion: { increment: 1 } },
    });

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
          version: user.activeRefreshTokenVersion + 1,
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

    return { success: true, message: '換發成功' };
  } catch (error) {
    console.log(error);

    return { success: false, message: '請重新登入' };
  }
});
