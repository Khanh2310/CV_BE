import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorator';
import { Request } from 'express';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    if (err || !user) {
      throw err || new UnauthorizedException('Token invalid');
    }

    const targetMethod = request.method;
    const targetEndPoint = request?.route.path;

    const permissions = user?.permissions ?? [];
    const isExits = permissions.find(
      (permission) =>
        targetMethod === permission.method &&
        targetEndPoint === permission.apiPath,
    );

    if (!isExits) {
      throw new ForbiddenException('You do not have access');
    }

    return user;
  }
}
