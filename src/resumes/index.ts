import { Module } from '@nestjs/common';
import { ResumesService } from './services/resumes.service';
import { ResumesController } from './controllers/resumes.controller';

@Module({
  controllers: [ResumesController],
  providers: [ResumesService],
})
export class ResumesModule {}
