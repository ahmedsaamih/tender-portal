import { faker } from '@faker-js/faker';
import { Prisma, PrismaClient } from '@prisma/client';

export async function getUsers() {
  const prisma = new PrismaClient();

  const users: Prisma.UserCreateInput[] = [];

  const organizations = await prisma.organization.findMany();
  const vendors = await prisma.vendor.findMany();

  organizations.forEach((organization) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    users.push({
      name: `${firstName} ${lastName}`,
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      password: 'password',
      lastLoginAt: null,
      type: 'organization',
      organization: { connect: { id: organization.id } },
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    });
  });

  vendors.forEach((vendor) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    users.push({
      name: `${firstName} ${lastName}`,
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      password: 'password',
      lastLoginAt: null,
      type: 'vendor',
      vendor: { connect: { id: vendor.id } },
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    });
  });

  users.find((u) => u.type === 'organization').email = 'o@email.com';
  users.find((u) => u.type === 'vendor').email = 'v@email.com';

  return users;
}
