import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { TendersController } from './tenders.controller';
import { TendersService } from './tenders.service';
import { VendorsController } from './vendors.controller';
import { VendorsService } from './vendors.service';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [
    TendersController,
    StatsController,
    VendorsController,
    OrganizationsController,
    UsersController,
  ],
  providers: [
    TendersService,
    StatsService,
    VendorsService,
    OrganizationsService,
    UsersService,
  ],
})
export class TendersModule {}
