import { Injectable } from '@nestjs/common';
import { Vendor } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VendorsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: string): Promise<Vendor[]> {
    return await this.prisma.vendor.findMany({
      where: {
        OR: query
          ? [
              { name: { contains: query } },
              { registration_no: { contains: query } },
            ]
          : undefined,
      },
      orderBy: { id: 'desc' },
    });
  }
}
