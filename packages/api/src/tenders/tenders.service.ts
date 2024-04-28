import { Injectable, NotFoundException } from '@nestjs/common';
import { Bid, Tender } from '@prisma/client';
import { CreateTenderDto } from './types';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TendersService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: string, showExpired: boolean): Promise<Tender[]> {
    return await this.prisma.tender.findMany({
      where: {
        OR: query
          ? [
              { number: { contains: query } },
              { title: { contains: query } },
              { description: { contains: query } },
              { organization: { name: { contains: query } } },
            ]
          : undefined,
        dueDate: showExpired ? undefined : { gte: new Date() },
      },
      include: { organization: true },
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: number): Promise<Tender> {
    return await this.prisma.$transaction(async (tx) => {
      const tender = await tx.tender.findUnique({
        where: { id },
        include: { organization: true, bids: true },
      });

      if (!tender) throw new NotFoundException('Tender not found');

      if (tender.dueDate >= new Date()) {
        await tx.tender.update({
          data: { views: { increment: 1 } },
          where: { id },
        });
      }

      return tender;
    });
  }

  async create(data: CreateTenderDto, organizationId: number): Promise<Tender> {
    return await this.prisma.$transaction(async (tx) => {
      const numberSeries = await tx.numberSeries.findFirstOrThrow({
        where: { name: 'Tender' },
      });

      await tx.numberSeries.update({
        where: { id: numberSeries.id },
        data: { lastNumber: { increment: 1 } },
      });

      return await tx.tender.create({
        data: {
          number: `${numberSeries.series}/${new Date().getFullYear()}/${(numberSeries.lastNumber + 1).toString().padStart(4, '0')}`,
          title: data.title,
          description: data.description,
          dueDate: new Date(data.dueDate),
          organization: { connect: { id: organizationId } },
        },
      });
    });
  }

  async findMyTenders(
    query: string,
    organizationId: number,
  ): Promise<Tender[]> {
    return await this.prisma.tender.findMany({
      where: {
        OR: query
          ? [{ number: { contains: query } }, { title: { contains: query } }]
          : undefined,
        organizationId,
      },
      include: { bids: { include: { vendor: true } } },
      orderBy: { id: 'desc' },
    });
  }

  async findPopular(): Promise<Tender[]> {
    return await this.prisma.tender.findMany({
      where: { dueDate: { gte: new Date() } },
      include: { organization: true },
      orderBy: { views: 'desc' },
      take: 2,
    });
  }

  async apply(tenderId: number, vendorId: number): Promise<Bid> {
    return this.prisma.bid.create({
      data: {
        tender: { connect: { id: tenderId } },
        vendor: { connect: { id: vendorId } },
      },
    });
  }
}
