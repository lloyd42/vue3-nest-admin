import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty({
    description: '用户名',
    example: 'abc',
  })
  username: string;

  @Column()
  @ApiProperty({
    description: '密码',
    example: '123456',
  })
  password: string;

  @Column({ default: 1 })
  @ApiProperty({
    description: '账号是否激活',
    example: 1,
  })
  actived: number;
}
