import {
  Module,
  CacheModule as redisCacheModule,
  Global,
} from '@nestjs/common';
import { CacheController } from './cache.controller';
import { CacheService } from './cache.service';
import * as redisStore from 'cache-manager-redis-store';

@Global()
@Module({
  imports: [
    redisCacheModule.register({
      store: redisStore,
      port: 6379,
      host: '127.0.0.1',
    }),
  ],
  controllers: [CacheController],
  providers: [CacheService],
  exports: [CacheService, redisCacheModule],
})
export class CacheModule {}
