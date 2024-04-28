import { ConfigService } from '@nestjs/config';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private configService: ConfigService) {
    super({
      log: configService.get('PRISMA_LOG_LEVELS').split(','),
    });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }
}
