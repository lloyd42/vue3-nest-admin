import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANT } from 'src/auth/jwt.constant';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { HashPwdMiddleware } from 'src/middleware/hash-pwd.middleware';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy],
  imports: [
    JwtModule.register({
      secret: JWT_CONSTANT.secret,
    }),
    UserModule,
  ],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HashPwdMiddleware).forRoutes('user/regist');
  }
}
