import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/entity/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('用户验证模块')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('regist')
  @ApiOperation({
    summary: '用户注册',
  })
  async registerUser(@Body() userDto: User) {
    return await this.authService.regist(userDto);
  }

  @Post('login')
  @ApiOperation({
    summary: '用户登录',
  })
  async login(@Body() userDto: User) {
    return this.authService.login(userDto);
  }
}
