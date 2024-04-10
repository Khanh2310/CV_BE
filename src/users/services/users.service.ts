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
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserM.name) private UserModel: SoftDeleteModel<UserDocument>,
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
    });
  }

  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  async remove(id: string, user: IUser) {
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

    const hashPassword = this.getHashPassword(password);
    const newRegister = await this.UserModel.create({
      name,
      email,
      password: hashPassword,
      age,
      gender,
      address,
      role: 'USER',
    });

    return newRegister;
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) return 'User not found';

    return await this.UserModel.findOne({
      _id: id,
    }).select('-password');
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.page;
    delete filter.limit;

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
    return await this.UserModel.findOne({ refreshToken });
  }
}
