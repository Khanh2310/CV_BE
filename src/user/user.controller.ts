import { Controller, Delete, Get } from '@nestjs/common';
@Controller('user')
export class UserController {
  @Get()
  findAll(): string {
    return 'Get User';
  }

  @Delete('/by-id')
  findbyId(): string {
    return 'this action will delete a user by id';
  }
}
