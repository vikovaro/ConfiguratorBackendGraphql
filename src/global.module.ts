import { Module, Global, ClassSerializerInterceptor } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { APP_FILTER, APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';
import { RedisCacheModule } from './cache/redis.module';
import { ExceptionsFilter } from './exception-filters/exception-filter';
import { PrismaExceptionFilter } from './exception-filters/prisma.exception.filter';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthRestGuard } from './guards/auth-rest.guard';
import { AuthRefreshRestGuard } from './guards/auth-refresh.guad';
import { ConfiguratorModule } from './features/configurator/configurator.module';
import { UserModule } from './features/user/user.module';
import { UserRepository } from './features/user/repositories/user.repository';
import { OrderModule } from './features/order/order.module';
import { RolesGuard } from './guards/roles.guard';
import { MetricsModule } from './metrics/metrics.module';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        RedisCacheModule,
        PrismaModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: '30m',
                },
                global: true,
            }),
        }),
        ConfiguratorModule,
        OrderModule,
        UserModule,
        MetricsModule,
    ],
    providers: [
        UserRepository,
        AuthRestGuard,
        AuthRefreshRestGuard,
        ConfigService,
        PrismaClient,
        {
            provide: APP_FILTER,
            useClass: ExceptionsFilter,
        },
        {
            provide: APP_FILTER,
            useClass: PrismaExceptionFilter,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ClassSerializerInterceptor,
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
    exports: [ConfigService, PrismaClient, RedisCacheModule],
})
export class GlobalModule {}
