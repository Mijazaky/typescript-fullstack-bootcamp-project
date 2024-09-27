import { PrismaClient } from '@repo/db';
import { seed } from '@repo/db/seed';
import { test as setup } from '@playwright/test';

const prisma = new PrismaClient();

setup.describe('global setup', () => {
  setup('conditionally seed database', async () => {
    console.log('Checking if database seeding is necessary...');

    const productCount = await prisma.product.count(); // Change `product` to the relevant table

    if (productCount === 0) {
      console.log('Seeding database...');
      try {
        await seed();
        console.log('Seeding completed successfully');
      } catch (error) {
        console.error('Error seeding database:', error);
      } finally {
        await prisma.$disconnect();
      }
    } else {
      console.log('Database already seeded, skipping...');
      await prisma.$disconnect();
    }
  });
});
