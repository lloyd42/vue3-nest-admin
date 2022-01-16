import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { IResponse } from 'src/interface/response.interface';
import { encript } from 'src/utils/encription';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { async } from 'rxjs';

const logger = new Logger('user.service.ts');

@Injectable()
export class UserService {
  private response: IResponse;
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  /**
   * 用户注册
   * @param user
   * @returns
   */
  async regist(user: User) {
    return this.findOneByUserName(user.username)
      .then((res) => {
        if (res) {
          this.response = {
            code: 1,
            msg: '当前用户已存在',
          };
          throw this.response;
        }
      })
      .then(() => {
        try {
          this.usersRepository.insert(user);
          this.response = {
            code: 0,
            msg: '用户注册成功',
          };
          return this.response;
        } catch (error) {
          this.response = {
            code: 0,
            msg: '用户注册失败:' + error,
          };
          throw this.response;
        }
      })
      .catch((err) => {
        logger.warn(`警告: ${user.username} ${err.msg}`);
        return this.response;
      });
  }
  /**
   * 验证用户登录
   * @param user
   * @returns
   */
  private async validateLogin(user: User) {
    const username: string = user.username;
    const password: string = user.password;
    return await this.findOneByUserName(username)
      .then((res) => {
        if (!res) {
          this.response = {
            code: 1,
            msg: '用户不存在',
          };
          throw this.response;
        }
        return res;
      })
      .then((u: User) => {
        const pwd = encript(password, u.salt);
        if (pwd === u.password) {
          this.response = {
            code: 0,
            msg: '登录成功',
          };
          return this.response;
        } else {
          this.response = {
            code: 1,
            msg: '用户名密码错误,登录失败',
          };
          throw this.response;
        }
      })
      .catch((err) => {
        logger.warn(`警告 ${username} ${err.msg}`);
        return this.response;
      });
  }
  /**
   * jwt用户登录
   * @param user
   * @returns
   */
  async login(user: User) {
    return await this.validateLogin(user)
      .then(async (res) => {
        if (res.code !== 0) {
          this.response = res;
          throw this.response;
        }
        this.response = {
          code: 0,
          msg: {
            token: await this.createToken(user),
          },
        };
        return this.response;
      })
      .catch((err) => {
        logger.warn(`警告 ${user.username} ${err.msg}`);
        return this.response;
      });
  }

  private async createToken(user: User) {
    return await this.jwtService.sign(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }
  /**
   * 通过用户名验证是否存在此用户
   * @param username 用户名
   * @returns
   */
  async findOneByUserName(username: string): Promise<User> {
    return await this.usersRepository.findOne({
      username,
    });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
