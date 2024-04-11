import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
  Query,
} from '@nestjs/common';
import { UsersService } from '../services';
import { CreateUserDto, UpdateUserDto } from '../dto';
import { Public, User } from 'src/auth/decorator';
import { IUser } from '../types';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto, @User() user: IUser) {
    return this.usersService.create(createUserDto, user);
  }

  @Patch()
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @User() user: IUser,
  ) {
    return this.usersService.update(id, updateUserDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.usersService.remove(id, user);
  }

  // find user by Id
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // get all user

  @Public()
  @Get()
  findAll(
    @Query('current') currentPage: string,
    @Query('pageSize') limit: string,
    @Query() qs: string,
  ) {
    return this.usersService.findAll(+currentPage, +limit, qs);
  }
}
