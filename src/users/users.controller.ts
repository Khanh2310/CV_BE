import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // No DTO
  // @Post()
  // create(
  //   @Body('email') email: string,
  //   @Body('password') password: string,
  //   @Body('name') name: string,
  // ) {
  //   return this.usersService.create(email, password, name);
  // }

  // With DTO
  @Post()
  create(@Body() addUser: CreateUserDto) {
    return this.usersService.create(addUser);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  // trường hợp thằng nest nó chạy từ trên xuống nên là nó thấy cái nào map (khớp là nó lụm)
  // ví dụ thử
  @Get('/abc')
  findABC() {
    // const id:string = req.param.id
    return 'djashdjsad'; // + convert string => number
  }

  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
