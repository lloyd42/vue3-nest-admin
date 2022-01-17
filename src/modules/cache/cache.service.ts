import { CACHE_MANAGER, Inject, Injectable, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { IResponse } from 'src/interface/response.interface';

const logger = new Logger('cache.service.ts');

@Injectable()
export class CacheService {
  private response: IResponse;
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  /**
   * 设置缓存
   * @param key 键
   * @param val 值
   * @param ttl 时效
   */
  async setCache(key: string, val: string, ttl: number) {
    try {
      await this.cacheManager.set(key, val, { ttl: ttl });
      this.response = {
        code: 0,
        msg: '设置缓存成功',
      };
    } catch (error) {
      logger.warn(`警告 redis set ${key} ${error}`);
      this.response = {
        code: 1,
        msg: '设置缓存失败',
      };
    }
    return this.response;
  }
  /**
   * 获取缓存
   * @param key 键
   * @returns
   */
  async getCache(key: any): Promise<any> {
    const val: any = await this.cacheManager.get(key);
    this.response = {
      code: 0,
      msg: '获取缓存成功',
      data: val,
    };
    return this.response;
  }
}
