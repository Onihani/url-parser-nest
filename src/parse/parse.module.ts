import { Module } from '@nestjs/common';
import { ParseController } from './parse.controller';
import { ParseService, ParsePrismaService } from './parse.service';

@Module({
  controllers: [ParseController],
  providers: [ParseService, ParsePrismaService],
})
export class ParseModule {}
