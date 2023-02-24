export default defineEventHandler(async (event) => {
  try {
    const prisma = usePrismaClient();

    const products = await prisma.product.findMany();

    return { success: true, message: '商品查詢成功', products };
  } catch (error) {
    return { success: false };
  }
});
