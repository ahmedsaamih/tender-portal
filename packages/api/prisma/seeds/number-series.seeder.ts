import { Prisma } from '@prisma/client';

export const numberSeries: Prisma.NumberSeriesCreateInput[] = [
  {
    name: 'Tender',
    series: 'TD',
    lastNumber: 0,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];
