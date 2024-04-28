import { Controller, Get, Query } from '@nestjs/common';
import { Organization } from '@prisma/client';
import { OrganizationsService } from './organizations.service';

@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Get()
  async findAll(@Query('query') query: string): Promise<Organization[]> {
    return await this.organizationsService.findAll(query);
  }
  @Get('tenders/count')
  async tenderCount() {
    return await this.organizationsService.tenderCount();
  }
}
