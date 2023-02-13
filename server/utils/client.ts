import { PrismaClient } from '@prisma/client';

let _prisma: PrismaClient;

export const getPrismaClient = async () => {
  if (!_prisma) {
    _prisma = new PrismaClient();

    await _prisma.$connect();

    console.log('● MongoDB connection established');
  }

  return _prisma;
};
