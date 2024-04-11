import { Module } from '@nestjs/common';
import { JobsService } from './services/jobs.service';
import { JobsController } from './controllers/jobs.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Jobs, JobsSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Jobs.name,
        schema: JobsSchema,
      },
    ]),
  ],
  controllers: [JobsController],
  providers: [JobsService],
})
export class JobsModule {}
