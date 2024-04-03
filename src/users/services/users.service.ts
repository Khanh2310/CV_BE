/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { User } from '../schemas';
import { CreateUserDto, UpdateUserDto } from '../dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  getHashPassword = (Hashpassword: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(Hashpassword, salt);
    return hash;
  };

  findAll() {
    return `Find User Success`;
  }

  async create(addUser: CreateUserDto) {
    const hash = this.getHashPassword(addUser.password);
    const user = await this.UserModel.create({
      email: addUser.email,
      password: hash,
      name: addUser.name,
    });
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.UserModel.updateOne(
      {
        _id: updateUserDto._id,
      },
      {
        ...updateUserDto,
      },
    );
  }

  findOneByUserName(username: string) {
    return this.UserModel.findOne({
      email: username,
    });
  }

  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) return 'user not found';

    return this.UserModel.deleteOne({
      _id: id,
    });
  }
}
