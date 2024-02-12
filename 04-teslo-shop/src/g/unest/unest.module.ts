import { Module } from '@nestjs/common';
import { UnestService } from './unest.service';
import { UnestController } from './unest.controller';

@Module({
  controllers: [UnestController],
  providers: [UnestService],
})
export class UnestModule {}
