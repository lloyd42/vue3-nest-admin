import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { IResponse } from 'src/interface/response.interface';
import { Repository } from 'typeorm';
import { CacheService } from '../cache/cache.service';

const logger = new Logger('user.service.ts');

@Injectable()
export class UserService {
  private response: IResponse;
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private cacheService: CacheService,
  ) {}

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

  async saveHello() {
    return await this.cacheService.setCache('a', 'aaa', 1000 * 60);
  }

  async getHello() {
    return await this.cacheService.getCache('a');
  }
}
