import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  // Create fake collections
  const collections = await Promise.all(
    Array.from({ length: 3 }).map(() =>
      prisma.collection.create({
        data: {
          name: faker.commerce.department(),
        },
      })
    )
  );

  // Create fake variations
  const variations = await Promise.all(
    Array.from({ length: 3 }).map(() =>
      prisma.variation.create({
        data: {
          name: faker.commerce.productAdjective(),
        },
      })
    )
  );

  // Create fake products
  await Promise.all(
    Array.from({ length: 10 }).map(() =>
      prisma.product.create({
        data: {
          name: faker.commerce.productName(),
          author: faker.name.fullName(),
          variation: {
            connect: {
              id: variations[Math.floor(Math.random() * variations.length)].id,
            },
          },
          image: faker.image.imageUrl(),
          price: parseFloat(faker.commerce.price()),
          collection: {
            connect: {
              id: collections[Math.floor(Math.random() * collections.length)].id,
            },
          },
        },
      })
    )
  );
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });