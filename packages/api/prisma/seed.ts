import { PrismaClient } from '@prisma/client';

import { numberSeries } from './seeds/number-series.seeder';
import { organizations } from './seeds/organization.seeder';
import { getVendors } from './seeds/vendor.seeder';

import { getTenders } from './seeds/tender.seeder';
import { getBids } from './seeds/bids.seeder';
import { getUsers } from './seeds/user.seeder';

const prisma = new PrismaClient();

async function main() {
  for await (const series of numberSeries) {
    await prisma.numberSeries.create({ data: series });
  }
  for await (const organization of organizations) {
    await prisma.organization.create({ data: organization });
  }
  for await (const vendor of await getVendors()) {
    await prisma.vendor.create({ data: vendor });
  }
  for await (const tender of await getTenders()) {
    await prisma.tender.create({ data: tender });
  }
  for await (const bid of await getBids()) {
    await prisma.bid.create({ data: bid });
  }
  for await (const user of await getUsers()) {
    await prisma.user.create({ data: user });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
