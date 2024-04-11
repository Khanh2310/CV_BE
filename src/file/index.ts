import { Module } from '@nestjs/common';
import { FileService } from './services/file.service';
import { FileController } from './controllers/file.controller';

@Module({
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
