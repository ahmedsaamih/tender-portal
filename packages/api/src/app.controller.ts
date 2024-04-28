import { ConfigService } from '@nestjs/config';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private configService: ConfigService) {}

  @Get()
  getInfo(): { name: string; version: string } {
    return {
      name: this.configService
        .get('APP_NAME')
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .toLowerCase(),
      version: '0.0.1',
    };
  }
}
