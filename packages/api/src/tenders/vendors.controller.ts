import { Controller, Get, Query } from '@nestjs/common';
import { Vendor } from '@prisma/client';
import { VendorsService } from './vendors.service';

@Controller('vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  @Get()
  async findAll(@Query('query') query: string): Promise<Vendor[]> {
    return await this.vendorsService.findAll(query);
  }
}
