import { Module } from '@nestjs/common';
import { TendersController } from './tenders.controller';
import { VendorsController } from './vendors.controller';
import { OrganizationsController } from './organizations.controller';
import { UsersController } from './users.controller';
import { TendersService } from './tenders.service';
import { VendorsService } from './vendors.service';
import { OrganizationsService } from './organizations.service';
import { UsersService } from './users.service';

@Module({
  controllers: [
    TendersController,
    VendorsController,
    OrganizationsController,
    UsersController,
  ],
  providers: [
    TendersService,
    VendorsService,
    OrganizationsService,
    UsersService,
  ],
})
export class UsersModule {}
