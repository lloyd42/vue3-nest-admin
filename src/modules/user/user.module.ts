import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { HashPwdMiddleware } from 'src/middleware/hash-pwd.middleware';
import { JwtModule } from '@nestjs/jwt';
import { JWT_CONSTANT } from 'src/auth/jwt.constant';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: JWT_CONSTANT.secret,
    }),
  ],
  providers: [UserService, JwtStrategy],
  controllers: [UserController],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HashPwdMiddleware).forRoutes('user/regist');
  }
}
