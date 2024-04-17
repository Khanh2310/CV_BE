import { Type } from 'class-transformer';
import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';

class Company {
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  name: string;
}
export class CreateUserDto {
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail({}, { message: 'Email must be an email' })
  email: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;

  @IsNotEmpty({ message: 'Age cannot be empty' })
  age: number;

  @IsNotEmpty({ message: 'Gender cannot be empty' })
  gender: string;

  @IsNotEmpty({ message: 'Address cannot be empty' })
  address: string;

  @IsNotEmpty({ message: 'Role cannot be empty' })
  @IsMongoId({ message: 'Role is a mongo id' })
  role: mongoose.Schema.Types.ObjectId;

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company: Company;
}

export class RegisterUserDto {
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail({}, { message: 'Email must be an email' })
  email: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;

  @IsNotEmpty({ message: 'Age cannot be empty' })
  age: number;

  @IsNotEmpty({ message: 'Gender cannot be empty' })
  gender: string;

  @IsNotEmpty({ message: 'Address cannot be empty' })
  address: string;
}
