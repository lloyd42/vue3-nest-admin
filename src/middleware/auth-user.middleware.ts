import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class AuthUserMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: NextFunction) {
    if (req.cookies.token) {
      next();
    } else {
      // 401
      throw new UnauthorizedException();
    }
  }
}
