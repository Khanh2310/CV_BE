import { IsNotEmpty } from 'class-validator';

export class CreatePermissionDto {
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @IsNotEmpty({ message: 'apiPath cannot be empty' })
  apiPath: string;

  @IsNotEmpty({ message: 'method cannot be empty' })
  method: string;

  @IsNotEmpty({ message: 'module cannot be empty' })
  module: string;
}
