import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  /**
   * @param reflector 用于获取metadata的key
   */
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string>('roles', context.getHandler());
    // 没有权限要求都放行
    if (!roles) {
      return true;
    }
    // 获取请求报文,用于权限对比
    switch (context.switchToHttp().getRequest().user) {
      case 'user':
    }
    return true;
  }
}
