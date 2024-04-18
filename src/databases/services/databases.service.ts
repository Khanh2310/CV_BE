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
                        description: "Người dùng/ ứng viên sử dụng hệ thống",
                        isActive: true,
                        permissions: [] // không set quyền chỉ cần add role
                    }

                ])
            }

            // create user
            if (countUser === 0) {
                const adminRole = await this.roleModel.findOne({ name: ADMIN_ROLE })
                const userRole = await this.roleModel.findOne({ name: USER_ROLE })
             
                await this.userModel.insertMany([
                    {
                        name: "I'm admin",
                        email: "admin@gmail.com",
                        password: this.usersService.getHashPassword(this.configService.get<string>("INIT_PASSWORD")),
                        age: 24,
                        gender: "MALE",
                        address: "VietNam",
                        role: adminRole?._id
                    },
                    {
                        name: "I'm user",
                        email: "user@gmail.com",
                        password: this.usersService.getHashPassword(this.configService.get<string>("INIT_PASSWORD")),
                        age: 24,
                        gender: "MALE",
                        address: "VietNam",
                        role: userRole?._id
                    }
                ])
            }

            if (countUser > 0 && countRole > 0 && countPermission > 0) {
                this.logger.log(">>> ALREADY INIT.....");
            }
        }

    }
}

