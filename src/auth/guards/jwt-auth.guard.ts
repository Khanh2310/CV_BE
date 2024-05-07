import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY, IS_PUBLIC_PERMISSION } from '../decorator';
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

const isSkipPermission = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_PERMISSION, [
      context.getHandler(),
      context.getClass(),
    ]);



    if (err || !user) {
      throw err || new UnauthorizedException('Token invalid');
    }

    const targetMethod = request.method;
    const targetEndPoint = request?.route.path as string;

    const permissions = user?.permissions ?? [];
    let isExits = permissions.find(
      (permission) =>
        targetMethod === permission.method &&
        targetEndPoint === permission.apiPath,
    );

    if (targetEndPoint.startsWith('/v1/api/auth')) isExits = true;
    if (!isExits && !isSkipPermission) {
      throw new ForbiddenException('You do not have access');
    }

    return user;
  }
}
