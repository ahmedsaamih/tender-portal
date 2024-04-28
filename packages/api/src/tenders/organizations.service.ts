import { Injectable } from '@nestjs/common';
import { Organization } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
// import { contains } from 'class-validator';

@Injectable()
export class OrganizationsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: string): Promise<Organization[]> {
    return await this.prisma.organization.findMany({
      orderBy: { id: 'desc' },
      where: {
        OR: query
          ? [{ name: { contains: query } }, { address: { contains: query } }]
          : undefined,
      },
    });
  }
  async tenderCount() {
    return await this.prisma.organization.findMany({
      include: {
        _count: {
          select: { tenders: true },
        },
      },
    });
  }
}
