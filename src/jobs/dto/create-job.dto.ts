import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';

class Company {
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  logo: string;
}
export class CreateJobDto {
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @IsNotEmpty({ message: 'Skills cannot be empty' })
  @IsArray({ message: 'Skills the format must be of type array' })
  @IsString({ each: true, message: 'Skills the format must be of type string' })
  skills: string[];

  @IsNotEmpty({ message: 'Company cannot be empty' })
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company: Company;

  @IsNotEmpty({ message: 'Location cannot be empty' })
  location: string;

  @IsNotEmpty({ message: 'Salary cannot be empty' })
  salary: number;

  @IsNotEmpty({ message: 'Quantity cannot be empty' })
  quantity: string;

  @IsNotEmpty({ message: 'Level cannot be empty' })
  level: string;

  @IsNotEmpty({ message: 'Description cannot be empty' })
  description: string;

  @IsNotEmpty({ message: 'startDate cannot be empty' })
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'startDate is format Date' })
  startDate: Date;

  @IsNotEmpty({ message: 'endDate cannot be empty' })
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'endDate is format Date' })
  endDate: Date;

  @IsNotEmpty({ message: 'isActive cannot be empty' })
  @IsBoolean({ message: 'isActive is format boolean' })
  isActive: boolean;
}
