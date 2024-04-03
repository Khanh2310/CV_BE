import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from '../services';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { Public } from 'src/auth/customize';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  create(@Body() addUser: CreateUserDto) {
    return this.usersService.create(addUser);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
