import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { TendersModule } from './tenders/tenders.module';

@Module({
  imports: [
    ConfigModule.forRoot({ expandVariables: true, isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        'packages',
        'ui',
        'dist',
      ),
    }),
    AuthModule,
    PrismaModule,
    TendersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
