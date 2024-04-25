import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateSubscriberDto {
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @IsNotEmpty({ message: 'Email cannot be empty' })
  email: string;

  @IsNotEmpty({ message: 'Skills cannot be empty' })
  @IsArray({ message: 'Skills the format must be of type array' })
  skills: string[];
}
