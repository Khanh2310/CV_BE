import { IsArray, IsMongoId, IsNotEmpty } from 'class-validator';
import mongoose from 'mongoose';

export class CreateRoleDto {
  @IsNotEmpty({ message: ' Name cannot be empty' })
  name: string;

  @IsNotEmpty({ message: 'Description cannot be empty' })
  description: string;

  @IsNotEmpty({ message: 'isActive cannot be empty' })
  @IsArray({ message: 'isActive is format boolean' })
  isActive: boolean;

  @IsNotEmpty({ message: 'Permission cannot be empty' })
  @IsMongoId({ each: true, message: 'Permission is format array' })
  permissions: mongoose.Schema.Types.ObjectId[];
}
