import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  /**
   * 用户注册
   * @param user
   * @returns
   */
  async regist(user: User) {
    return this.usersRepository
      .find(user)
      .then((res) => {
        if (res.length > 0) {
          throw Error('用户已存在');
        }
      })
      .then(() => {
        try {
          return this.usersRepository.insert(user);
        } catch (error) {
          console.warn(error);
        }
      });
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
