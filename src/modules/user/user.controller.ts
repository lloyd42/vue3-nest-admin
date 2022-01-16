import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/entity/user.entity';
import { Role } from 'src/role/role.decorator';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('用户模块')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('regist')
  @ApiOperation({
    summary: '用户注册',
  })
  async registerUser(@Body() userDto: User) {
    return await this.userService.regist(userDto);
  }

  @Get('hello')
  @Role('admin')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('jwt')
  hello() {
    return 'hello';
  }

  @Post('login')
  @ApiOperation({
    summary: '用户登录',
  })
  async login(@Body() userDto: User) {
    return this.userService.login(userDto);
  }
}
