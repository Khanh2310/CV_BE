import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateJobDto } from '../dto/create-job.dto';
import { UpdateJobDto } from '../dto/update-job.dto';

import { IUser } from 'src/users/types';
import { InjectModel } from '@nestjs/mongoose';
import { Jobs, JobsDocument } from '../schemas';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Jobs.name)
    private jobsModel: SoftDeleteModel<JobsDocument>,
  ) {}
  async create(createJobDto: CreateJobDto, user: IUser) {
    const {
      name,
      skills,
      location,
      company,
      salary,
      quantity,
      level,
      description,
      startDate,
      endDate,
      isActive,
    } = createJobDto;

    if (startDate < endDate) {
      const newJob = await this.jobsModel.create({
        name,
        skills,
        location,
        company,
        salary,
        quantity,
        level,
        description,
        startDate,
        endDate,
        isActive,
        createdBy: {
          _id: user?._id,
          email: user?.email,
        },
      });

      return {
        _id: newJob._id,
        createdAt: newJob.createdAt,
      };
    } else {
      throw new BadRequestException(
        'startDate cannot be greater than endDate ',
      );
    }
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    const offset = (+currentPage - 1) * +limit;
    const defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.jobsModel.find(filter)).length;
    const totalPage = Math.ceil(totalItems / defaultLimit);

    const result = await this.jobsModel
      .find(filter)
      .skip(offset)
      .sort(String(sort))
      .limit(defaultLimit)
      .populate(population)
      .exec();

    return {
      meta: {
        currentPage: currentPage ? currentPage : 1,
        pageSize: limit ? limit : 10,
        pages: totalPage,
        total: totalItems,
      },
      result,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} job`;
  }

  async update(id: string, updateJobDto: UpdateJobDto, user: IUser) {
    const { startDate, endDate } = updateJobDto;

    if (startDate < endDate) {
      return this.jobsModel.updateOne(
        {
          _id: id,
        },
        {
          ...updateJobDto,
          updatedBy: {
            _id: user._id,
            email: user.email,
          },
        },
      );
    } else {
      throw new BadRequestException('startDate cannot be greater than endDate');
    }
  }

  async remove(id: string, user: IUser) {
    await this.jobsModel.updateOne(
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
    return this.jobsModel.softDelete({
      _id: id,
    });
  }
}
