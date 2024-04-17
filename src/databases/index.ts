import { Module } from '@nestjs/common';
import { DatabasesService } from './services/databases.service';
import { DatabasesController } from './controllers/databases.controller';

@Module({
  controllers: [DatabasesController],
  providers: [DatabasesService],
})
export class DatabasesModule {}
