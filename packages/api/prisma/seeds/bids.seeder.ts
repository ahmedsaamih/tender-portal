import { faker } from '@faker-js/faker';
import { Prisma, PrismaClient } from '@prisma/client';

export async function getBids() {
  const prisma = new PrismaClient();

  const bids: Prisma.BidCreateInput[] = [];

  const tenders = await prisma.tender.findMany();
  const vendors = await prisma.vendor.findMany();

  tenders.forEach((tender) => {
    const v = faker.helpers.shuffle(vendors);

    for (
      let i = 0;
      i < faker.number.int({ max: Math.floor(v.length / 1.25) });
      i++
    ) {
      bids.push({
        tender: { connect: { id: tender.id } },
        vendor: { connect: { id: v[i].id } },
        createdAt: faker.date.between({
          from: new Date(tender.createdAt),
          to:
            new Date(tender.dueDate) > new Date()
              ? new Date()
              : new Date(tender.dueDate),
        }),
      });
    }
  });

  return bids.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
}
