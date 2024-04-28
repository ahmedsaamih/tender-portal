import { Prisma } from '@prisma/client';

export const organizations: Prisma.OrganizationCreateInput[] = [
  {
    name: 'Business Center Corporation',
    address: 'M. Kaneeru Villa, Male',
    createdAt: new Date('2024-01-01'),
  },
  {
    name: 'Environmental Protection Agency',
    address: 'Green Building, Male',
    createdAt: new Date('2024-01-01'),
  },
  {
    name: 'Fuvahmulah City Council',
    address: 'Maadhandu 18015, Fuvahmulah',
    createdAt: new Date('2024-01-01'),
  },
  {
    name: 'Health Protection Agency',
    address: 'H.Roshani Building, Male',
    createdAt: new Date('2024-01-01'),
  },
  {
    name: 'Utility Regulatory Authority',
    address: 'Kaasinjee Magu, Male',
    createdAt: new Date('2024-01-01'),
  },
];
