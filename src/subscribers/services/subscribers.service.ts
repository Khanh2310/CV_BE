import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSubscriberDto } from '../dto/create-subscriber.dto';
import { UpdateSubscriberDto } from '../dto/update-subscriber.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Subscriber, SubscriberDocument } from '../schemas';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';
import { IUser } from 'src/users/types';
import mongoose from 'mongoose';
import { User } from 'src/auth/decorator';

@Injectable()
export class SubscribersService {
  constructor(
    @InjectModel(Subscriber.name)
    private subscriberModel: SoftDeleteModel<SubscriberDocument>,
  ) {}
  async create(createSubscriberDto: CreateSubscriberDto, user: IUser) {
    const { name, email, skills } = createSubscriberDto;
    const isExist = await this.subscriberModel.findOne({
      email,
    });
    if (isExist) {
      throw new BadRequestException(`Email ${email} already exits`);
    }
    const newSubscriber = await this.subscriberModel.create({
      name,
      email,
      skills,
      createdBy: {
        _id: user?._id,
        email: user?.email,
      },
    });
    return {
      _id: newSubscriber?._id,
      createdAt: newSubscriber?.createdAt,
    };
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    const offset = (+currentPage - 1) * +limit;
    const defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.subscriberModel.find(filter)).length;
    const totalPage = Math.ceil(totalItems / defaultLimit);

    const result = await this.subscriberModel
      .find(filter)
      .skip(offset)
      .sort(sort as any)
      .limit(defaultLimit)
      .populate(population)
      .exec();

    return {
      meta: {
        currentPage: currentPage,
        pageSize: limit,
        pages: totalPage,
        total: totalItems,
      },
      result,
    };
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) 'Subscriber not found';
    return await this.subscriberModel.findOne({
      _id: id,
    });
  }

  update(
    updateSubscriberDto: UpdateSubscriberDto,
     user: IUser,
  ) {
    return this.subscriberModel.updateOne(
      {
        email: user.email,
      },
      {
        ...updateSubscriberDto,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
      {
        upsert: true
      }
    );
  }

  async remove(id: string, user: IUser) {
    await this.subscriberModel.updateOne(
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

    return this.subscriberModel.softDelete({
      _id: id,
    });
  }



  async getSkills(user: IUser) {
    const { email } = user;
    return this.subscriberModel.findOne(
      {
      email
    },
      { skills: 1 })
  }
}
