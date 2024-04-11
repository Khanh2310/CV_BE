import { Module } from '@nestjs/common';
import { FileService } from './services/file.service';
import { FileController } from './controllers/file.controller';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from './config/file.config';

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: MulterConfigService
    })
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
