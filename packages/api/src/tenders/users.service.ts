import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
// import { contains } from 'class-validator';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: string): Promise<any[]> {
    return await this.prisma.user.findMany({
      orderBy: { id: 'asc' },
      where: {
        OR: query
          ? [{ name: { contains: query } }, { email: { contains: query } }]
          : undefined,
      },
      select: {
        id: true,
        name: true,
        email: true,
        lastLoginAt: true,
        type: true,
        vendorId: true,
        organizationId: true,
        createdAt: true,
        updatedAt: true,
        vendor: true,
        organization: true,
      },
    });
  }
}
