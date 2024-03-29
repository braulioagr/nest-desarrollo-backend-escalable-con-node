import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from 'src/auth/decorators';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) {}
  
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler());
    const req = context.switchToHttp().getRequest();
    const user = req.user as User;
    
    if(!validRoles || validRoles.length === 0) {
      return true;
    }

    if(!user) {
      throw new BadRequestException('User not found');
    }

    if(validRoles.some(role => user.roles.includes(role))) {
      return true;
    }
    
    throw new ForbiddenException(`User ${user.fullName} need a valid role: [${validRoles}]`);
  }
}
