import { Module } from '@nestjs/common';
import { TendersController } from './tenders.controller';
import { VendorsController } from './vendors.controller';
import { OrganizationsController } from './organizations.controller';
import { TendersService } from './tenders.service';
import { VendorsService } from './vendors.service';
import { OrganizationsService } from './organizations.service';

@Module({
  controllers: [TendersController, VendorsController, OrganizationsController],
  providers: [TendersService, VendorsService, OrganizationsService],
})
export class OrganizationsModule {}
