import { Injectable, BadRequestException } from '@nestjs/common';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { IUser } from 'src/users/types';
import { InjectModel } from '@nestjs/mongoose';
import { Permission, PermissionDocument } from '../schemas';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(Permission.name)
    private permissionModel: SoftDeleteModel<PermissionDocument>,
  ) {}
  async create(createPermissionDto: CreatePermissionDto, user: IUser) {
    const { name, apiPath, method, module } = createPermissionDto;
    const isExits = await this.permissionModel.findOne({
      apiPath,
      method,
    });
    if (isExits) {
      throw new BadRequestException(
        `Permission with apiPath: ${apiPath}, method: ${method} already exits`,
      );
    }
    const newPermission = await this.permissionModel.create({
      name,
      apiPath,
      method,
      module,
      createdBy: {
        _id: user._id,
        email: user.email,
      },
    });
    return {
      id: newPermission?._id,
      createdAt: newPermission?.createdAt,
    };
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    const offset = (+currentPage - 1) * +limit;
    const defaultLimit = +limit ? +limit : 10;

    const totalItems = (await this.permissionModel.find(filter)).length;
    const totalPage = Math.ceil(totalItems / defaultLimit);

    const result = await this.permissionModel
      .find(filter)
      .skip(offset)
      .sort(sort as any)
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
    return `This action returns a #${id} permission`;
  }

  async update(
    id: string,
    updatePermissionDto: UpdatePermissionDto,
    user: IUser,
  ) {
    const { apiPath, method } = updatePermissionDto;
    const isExits = await this.permissionModel.findOne({ apiPath, method });
    if (isExits) {
      throw new BadRequestException(
        `Permission with apiPath: ${apiPath}, method: ${method} already exits`,
      );
    }

    return await this.permissionModel.updateOne(
      {
        _id: id,
      },
      {
        ...updatePermissionDto,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
    );
  }

  remove(id: string) {
    return `This action removes a #${id} permission`;
  }
}
