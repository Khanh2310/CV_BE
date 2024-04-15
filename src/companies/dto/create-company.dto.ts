import { IsNotEmpty } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @IsNotEmpty({ message: 'Address cannot be empty' })
  address: string;

  @IsNotEmpty({ message: 'Description cannot be empty' })
  description: string;

  @IsNotEmpty({ message: 'Logo cannot be empty' })
  logo: string;
}
