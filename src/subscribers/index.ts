import { Module } from '@nestjs/common';
import { SubscribersService } from './services/subscribers.service';
import { SubscribersController } from './controllers/subscribers.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Subscriber, SubscriberSchema } from './schemas';

@Module({
 imports: [
    MongooseModule.forFeature([
      {
        name: Subscriber.name,
        schema: SubscriberSchema,
      },
    ]),
  ],
  controllers: [SubscribersController],
  providers: [SubscribersService],
})
export class SubscribersModule {}
