import { abbreviateNumber } from 'js-abbreviation-number';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Stats } from './types';

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  async stats(): Promise<Stats[]> {
    return await this.prisma.$transaction(async (tx) => {
      return [
        {
          title: 'Bid Submissions',
          count: abbreviateNumber(await tx.bid.count(), 0),
        },
        {
          title: 'Listings',
          count: abbreviateNumber(await tx.tender.count(), 0),
        },
        {
          title: 'Venders',
          count: abbreviateNumber(await tx.vendor.count(), 0),
        },
      ];
    });
  }
}
