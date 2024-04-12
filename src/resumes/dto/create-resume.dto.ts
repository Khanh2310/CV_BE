import { IsMongoId, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateResumeDto {
  @IsNotEmpty({ message: 'Email cannot be empty' })
  email: string;

  @IsNotEmpty({ message: 'userId cannot be empty' })
  userId: mongoose.Types.ObjectId;

  @IsNotEmpty({ message: 'url cannot be empty' })
  url: string;

  @IsNotEmpty({ message: 'status cannot be empty' })
  status: string;

  @IsNotEmpty({ message: 'companyId cannot be empty' })
  companyId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({ message: 'jobId cannot be empty' })
  jobId: mongoose.Schema.Types.ObjectId;
}

export class CreateUserCvDto {
  @IsNotEmpty({ message: 'url cannot be empty' })
  url: string;

  @IsNotEmpty({ message: 'companyId cannot be empty' })
  @IsMongoId({ message: 'companyId is a mongo id' })
  companyId: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty({
    message: 'jobId cannot be empty',
  })
  @IsMongoId({ message: 'jobId is a mongo id' })
  jobId: mongoose.Schema.Types.ObjectId;
}
