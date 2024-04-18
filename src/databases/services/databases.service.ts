import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { Permission, PermissionDocument } from 'src/permissions/schemas';
import { Role, RoleDocument } from 'src/roles/schemas';
import { User, UserDocument } from 'src/users/schemas';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/services/users.service';
import { ADMIN_ROLE, INIT_PERMISSIONS, USER_ROLE } from 'src/app';

@Injectable()
export class DatabasesService implements OnModuleInit {
    private readonly logger = new Logger(DatabasesService.name);
    constructor(
        @InjectModel(User.name)
        private userModel: SoftDeleteModel<UserDocument>, 
        
        @InjectModel(Permission.name)
        private permissionModel: SoftDeleteModel<PermissionDocument>,

        @InjectModel(Role.name)
        private roleModel: SoftDeleteModel<RoleDocument>,

        private configService: ConfigService,
        private usersService : UsersService
    ) { }
    
    async onModuleInit() {
        const isInit = this.configService.get<string>("SHOULD_INIT");
        if (Boolean(isInit)) {
            const countUser = await this.userModel.count({})
            const countPermission = await this.permissionModel.count({});
            const countRole = await this.roleModel.count({});


            // create permission

            if (countPermission === 0) {
                await this.permissionModel.insertMany(INIT_PERMISSIONS);
                // insertMany (bulk create) tạo nhiều phần tử cùng 1 lúc
            }

            // create role 
            if (countRole === 0) {
                const permissions = await this.permissionModel.find({}).select("_id")
                // find({}) lấy tất cả .select("_id") chỉ lấy id

                await this.roleModel.insertMany([
                    {
                        name: ADMIN_ROLE,
                        description: "Admin full quyền",
                        isActive: true,
                        permissions: permissions
                    },
                    {
                        name: USER_ROLE,
                        description: "User",
                        isActive: true,
                        permissions: permissions
                    }

                ])
            }
        }

    }
}

