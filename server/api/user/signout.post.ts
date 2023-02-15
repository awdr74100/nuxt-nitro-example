export default defineEventHandler(async (event) => {
  try {
    const cookies = parseCookies(event);

    if (!cookies.accessToken) throw new Error('Oops');

    const { payload } = await verifyAccessToken(cookies.accessToken);

    if (typeof payload.id !== 'string') throw new Error('Oops');

    const prisma = usePrismaClient();

    const user = await prisma.user.update({
      where: { id: payload.id },
      data: { tokenVersion: { increment: 1 } },
    });

    if (!user) throw new Error('Oops');

    deleteCookie(event, 'accessToken', { sameSite: 'strict', path: '/' });
    deleteCookie(event, 'refreshToken', {
      sameSite: 'strict',
      path: '/api/user/refresh_token',
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
});
