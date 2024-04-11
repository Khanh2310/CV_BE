import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Company, CompanyDocument } from '../schemas';
import { CreateCompanyDto, UpdateCompanyDto } from '../dto';
import { IUser } from 'src/users/types';
import aqp from 'api-query-params';
@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name)
    private companyModel: SoftDeleteModel<CompanyDocument>,
  ) {}
  create(createCompanyDto: CreateCompanyDto, user: IUser) {
    return this.companyModel.create({
      ...createCompanyDto,
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    const offset = (+currentPage - 1) * +limit;
    const defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.companyModel.find(filter)).length;
    const totalPage = Math.ceil(totalItems / defaultLimit);
    // const data = await this.companyModel.find({}, null, { limit: 10 }).exec();
    // return data;
    const result = await this.companyModel
      .find(filter)
      .skip(offset)
      .sort(String(sort))
      .limit(defaultLimit)
      .populate(population)
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

  findOne(id: string) {
    return `This action returns a #${id} company`;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto, user: IUser) {
    return await this.companyModel.updateOne(
      {
        _id: id,
      },
      {
        ...updateCompanyDto,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
  }

  async remove(id: string, user: IUser) {
    await this.companyModel.updateOne(
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

    return this.companyModel.softDelete({
      _id: id,
    });
  }
}
