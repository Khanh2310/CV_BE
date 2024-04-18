/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { User as UserM, UserDocument } from '../schemas';
import { CreateUserDto, RegisterUserDto, UpdateUserDto } from '../dto';
import { IUser } from '../types';
import { User } from 'src/auth/decorator';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';
import { Role, RoleDocument } from 'src/roles/schemas';
import { USER_ROLE } from 'src/app';
import * as path from 'path';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserM.name) private UserModel: SoftDeleteModel<UserDocument>,
    @InjectModel(Role.name) private roleModel: SoftDeleteModel<RoleDocument>
  ) {}

  getHashPassword = (Hashpassword: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(Hashpassword, salt);
    return hash;
  };

  async create(createUserDto: CreateUserDto, @User() user: IUser) {
    const { name, email, password, age, gender, address, role, company } =
      createUserDto;

    const hashPassword = this.getHashPassword(createUserDto.password);
    const isExit = await this.UserModel.findOne({ email });

    if (isExit) {
      throw new BadRequestException(`Email: ${email} already exits`);
    }
    const newUser = await this.UserModel.create({
      name,
      email,
      password: hashPassword,
      age,
      gender,
      address,
      role,
      company,
      createdBy: {
        _id: user?._id,
        email: user?.email,
      },
    });

    return {
      _id: newUser._id,
      createdAt: newUser.createdAt,
    };

    // newUser
  }

  async update(id: string, updateUserDto: UpdateUserDto, user: IUser) {
    return await this.UserModel.updateOne(
      {
        _id: updateUserDto._id,
      },
      {
        ...updateUserDto,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
  }

  findOneByUserName(username: string) {
    return this.UserModel.findOne({
      email: username,
    }).populate({
      path: 'role',
      select: {
        name: 1,
      },
    });
  }

  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  async remove(id: string, user: IUser) {
    const foundUser = await this.UserModel.findById(id);
    if (foundUser.email === 'bao123@gmail.com') {
      throw new BadRequestException('Admin email cannot be deleted');
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return 'User not found';

    await this.UserModel.updateOne(
      {
        _id: id,
      },
      {
        deletedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );

    return this.UserModel.softDelete({
      _id: id,
    });
  }

  async register(user: RegisterUserDto) {
    const { name, email, password, age, gender, address } = user;
    const isExit = await this.UserModel.findOne({ email });

    if (isExit) {
      throw new BadRequestException(`Email: ${email} already exits`);
    }

    const userRole = await this.roleModel.findOne({name: USER_ROLE})
    
    const hashPassword = this.getHashPassword(password);
    const newRegister = await this.UserModel.create({
      name,
      email,
      password: hashPassword,
      age,
      gender,
      address,
      role: userRole?._id,
    });

    return newRegister;
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) return 'User not found';

    return await this.UserModel.findOne({
      _id: id,
    })
      .select('-password')
      .populate({
        path: 'role',
        select: {
          name: 1,
          _id: 1,
        },
      });
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    const offset = (+currentPage - 1) * +limit;
    const defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.UserModel.find(filter)).length;
    const totalPage = Math.ceil(totalItems / defaultLimit);

    const result = await this.UserModel.find(filter)
      .skip(offset)
      .sort(String(sort))
      .limit(defaultLimit)
      .populate(population)
      .select('-password')
      .exec();

    return {
      meta: {
        current: currentPage ? currentPage : 1,
        pageSize: limit ? limit : 10,
        pages: totalPage,
        total: totalItems,
      },
      result,
    };
  }

  async updateRefreshToken(refreshToken: string, _id: string) {
    return await this.UserModel.updateOne(
      {
        _id,
      },
      {
        refreshToken,
      },
    );
  }

  async findUserByRefreshToken(refreshToken: string) {
    return await this.UserModel.findOne({ refreshToken }).populate({
      path: 'role',
      select: {
        name: 1
      }
    });
  }
}
