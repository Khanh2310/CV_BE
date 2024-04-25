import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSubscriberDto } from '../dto/create-subscriber.dto';
import { UpdateSubscriberDto } from '../dto/update-subscriber.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Subscriber, SubscriberDocument } from '../schemas';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';
import { IUser } from 'src/users/types';

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
    const { filter } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;
  }

  findOne(id: string) {
    return `This action returns a #${id} subscriber`;
  }

  update(id: string, updateSubscriberDto: UpdateSubscriberDto) {
    return `This action updates a #${updateSubscriberDto} subscriber`;
  }

  remove(id: string) {
    return `This action removes a #${id} subscriber`;
  }
}
