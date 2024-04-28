import { Controller, Get } from '@nestjs/common';
import { Stats } from './types';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get()
  async stats(): Promise<Stats[]> {
    return await this.statsService.stats();
  }
}
