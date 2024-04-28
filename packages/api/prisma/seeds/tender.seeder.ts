import * as dayjs from 'dayjs';
import { faker } from '@faker-js/faker';
import { Prisma, PrismaClient } from '@prisma/client';
import { rawTenders } from './_raw-tenders';

export async function getTenders() {
  const prisma = new PrismaClient();

  const tenders: Prisma.TenderCreateInput[] = [];

  const numberSeries = await prisma.numberSeries.findFirstOrThrow({
    where: { name: 'Tender' },
  });
  const organizations = await prisma.organization.findMany();

  rawTenders.forEach((tender) => {
    const date = faker.date.between({
      from: new Date('2024-01-01'),
      to: new Date(),
    });

    tenders.push({
      number: '0',
      title: tender.title,
      description: tender.description,
      dueDate: dayjs(date)
        .add(faker.helpers.arrayElement([14, 21, 28, 35, 45]), 'day')
        .toDate(),
      views: faker.number.int({ min: 100, max: 1000 }),
      organization: {
        connect: { id: faker.helpers.arrayElement(organizations).id },
      },
      createdAt: date,
      updatedAt: date,
    });
  });

  tenders
    .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
    .map((tender, index) => {
      tender.number = `${numberSeries.series}/${new Date(tender.createdAt).getFullYear()}/${(index + 1).toString().padStart(4, '0')}`;
    });

  await prisma.numberSeries.update({
    where: { id: numberSeries.id },
    data: {
      lastNumber: tenders.length,
      updatedAt: tenders[tenders.length - 1].updatedAt,
    },
  });

  return tenders;
}
