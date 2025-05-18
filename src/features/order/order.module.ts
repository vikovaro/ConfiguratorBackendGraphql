import { Module } from '@nestjs/common';
import { OrderService } from './services/order.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokenService } from '../user/services/token.service';
import { UserRepository } from '../user/repositories/user.repository';
import { OrderRepository } from './repositories/order.repository';
import { MetricsService } from '../../metrics/metrics.service';
import { OrderResolver } from './resolvers/order.resolver';

@Module({
    providers: [
        OrderService,
        TokenService,
        UserRepository,
        OrderRepository,
        MetricsService,
        OrderResolver,
    ],
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: '30d',
                },
                global: true,
            }),
        }),
    ],
})
export class OrderModule {}
