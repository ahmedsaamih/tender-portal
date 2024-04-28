import { faker } from '@faker-js/faker';
import { Prisma } from '@prisma/client';

export async function getVendors() {
  const vendors: Prisma.VendorCreateInput[] = [];

  for (let i = 0; i < 50; i++) {
    vendors.push({
      name: faker.company.name(),
      registration_no: faker.vehicle.vin(),
      status: 'active',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    });
  }

  return vendors;
}
