import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users';
import { AuthModule } from './auth';
import { CompaniesModule } from './companies';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { JobsModule } from './jobs';
import { FileModule } from './file';
import { ResumesModule } from './resumes';
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        connectionFactory: (connection) => {
          connection.plugin(softDeletePlugin);
          return connection;
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    CompaniesModule,
    JobsModule,
    FileModule,
    ResumesModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
