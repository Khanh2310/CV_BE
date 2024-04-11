import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { TransformInterceptor } from './interceptor';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configServices = app.get(ConfigService);

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));
  app.useGlobalPipes(new ValidationPipe());

  // config version api
  app.setGlobalPrefix('/v1/api');

  // useGlobalInterceptor
  app.useGlobalInterceptors(new TransformInterceptor(reflector));

  //config cors
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });

  // config cookie
  app.use(cookieParser());

  await app.listen(configServices.get('PORT'));
}
bootstrap();
