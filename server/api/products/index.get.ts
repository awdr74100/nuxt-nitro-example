export default defineEventHandler(async (event) => {
  try {
    const prisma = usePrismaClient();

    const products = await prisma.product.findMany();

    return { success: true, products };
  } catch (error) {
    return { success: false };
  }
});
