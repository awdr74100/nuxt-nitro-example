import { PrismaClient } from '@prisma/client';

export default defineNitroPlugin(async (nitroApp) => {
  const prisma = new PrismaClient();

  try {
    await prisma.$connect();

    console.log('Mongodb connected');
  } catch (error) {
    console.log(error);
  }
});
