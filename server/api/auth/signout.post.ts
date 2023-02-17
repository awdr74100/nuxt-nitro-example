export default defineEventHandler(async (event) => {
  const clearCookie = () => {
    deleteCookie(event, 'accessToken', { sameSite: 'strict', path: '/' });
    deleteCookie(event, 'refreshToken', {
      sameSite: 'strict',
      path: '/api/auth/refresh_token',
    });
  };

  try {
    const accessToken = getCookie(event, 'accessToken');

    const { id } = await verifyAccessToken<{ id: string }>(accessToken || '');

    const prisma = usePrismaClient();

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) throw new Error();

    await prisma.user.update({
      where: { id },
      data: { activeRefreshTokenVersion: { increment: 1 } },
    });

    clearCookie();

    return { success: true, message: '登出成功' };
  } catch (error) {
    clearCookie();

    return { success: true, message: '登出成功' };
  }
});
