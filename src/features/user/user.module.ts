import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokenService } from './services/token.service';
import { MetricsService } from '../../metrics/metrics.service';
import { UserResolver } from './resolvers/user.resolver';

@Module({
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
    providers: [UserService, TokenService, UserRepository, MetricsService, UserResolver],
})
export class UserModule {}
