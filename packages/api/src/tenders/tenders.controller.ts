import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Bid, Tender } from '@prisma/client';
import { verifyJwt } from '../jwt';
import { CreateTenderDto } from './types';
import { TendersService } from './tenders.service';

@Controller('tenders')
export class TendersController {
  constructor(private readonly tendersService: TendersService) {}

  @Get()
  async findAll(
    @Query('query') query: string,
    @Query('showExpired') showExpired: boolean = false,
  ): Promise<Tender[]> {
    return await this.tendersService.findAll(query, showExpired);
  }

  @Post()
  async create(
    @Body() createTenderDto: CreateTenderDto,
    @Req() request: Request,
  ): Promise<Tender> {
    if (!request.headers.authorization)
      throw new UnauthorizedException('Unauthorized');

    const token = request.headers.authorization.split(' ')[1];

    return await this.tendersService.create(
      createTenderDto,
      verifyJwt(token).id,
    );
  }

  @Get('my')
  async findMyTenders(
    @Query('query') query: string,
    @Req() request: Request,
  ): Promise<Tender[]> {
    if (!request.headers.authorization)
      throw new UnauthorizedException('Unauthorized');

    const token = request.headers.authorization.split(' ')[1];

    return await this.tendersService.findMyTenders(query, verifyJwt(token).id);
  }

  @Get('popular')
  async findPopular(): Promise<Tender[]> {
    return await this.tendersService.findPopular();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Tender> {
    return await this.tendersService.findOne(+id);
  }

  @Post(':id/apply')
  async apply(@Param('id') id: string, @Req() request: Request): Promise<Bid> {
    if (!request.headers.authorization)
      throw new UnauthorizedException('Unauthorized');

    const token = request.headers.authorization.split(' ')[1];

    return await this.tendersService.apply(+id, verifyJwt(token).id);
  }
}
