import type { Role } from '@prisma/client';

export default defineEventHandler(async (event) => {
  try {
    const user = await useAuth<{ role: Role }>(event);

    if (user.role !== 'ADMIN') throw new Error();

    const files = await readMultipartFormData(event);

    if (!files || !files.length) throw new Error();

    const imgur = useImgurClient();

    const links = await imgur.upload(files);

    return { success: true, message: '上傳成功', links };
  } catch (error) {
    return { success: false };
  }
});
