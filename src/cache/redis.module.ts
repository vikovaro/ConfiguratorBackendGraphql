import { Module } from '@nestjs/common';
import { createKeyv } from '@keyv/redis';
import { Keyv } from 'keyv';
import { CacheableMemory } from 'cacheable';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
        CacheModule.registerAsync({
            isGlobal: true,
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const redisPassword = configService.get('REDIS_PASSWORD');
                const redisHost = configService.get('REDIS_HOST', 'localhost');
                const redisPort = configService.get('REDIS_PORT', 6379);
                const redisDb = configService.get('REDIS_DB', 0);

                const redisUrl = `redis://:${redisPassword}@${redisHost}:${redisPort}/${redisDb}`;

                return {
                    stores: [
                        new Keyv({
                            store: new CacheableMemory({
                                ttl: 60000,
                                lruSize: 5000,
                            }),
                        }),
                        createKeyv(redisUrl),
                    ],
                };
            },
        }),
    ],
})
export class RedisCacheModule {}
