import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { addSalt, encript } from 'src/utils/encription';

@Injectable()
export class HashPwdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const pwd = req.body['password'];
    if (pwd) {
      const salt = addSalt();
      const epwd = encript(pwd, salt);
      req.body['password'] = epwd;
      req.body['salt'] = salt;
    }
    next();
  }
}
