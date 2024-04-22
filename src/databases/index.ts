import { Module } from '@nestjs/common';
import { DatabasesService } from './services/databases.service';
import { DatabasesController } from './controllers/databases.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas';
import { Permission, PermissionSchema } from 'src/permissions/schemas';
import { Role, RoleSchema } from 'src/roles/schemas';
import { UsersService } from 'src/users/services';

@Module({
  controllers: [DatabasesController],
  providers: [DatabasesService, UsersService],
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Permission.name, schema: PermissionSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
})
export class DatabasesModule {}
