import { Module } from '@nestjs/common';
import { ConfiguratorService } from './services/configurator.service';
import { ConfiguratorRepository } from './repositories/configurator.repository';
import { UserRepository } from '../user/repositories/user.repository';
import { UserService } from '../user/services/user.service';
import { TokenService } from '../user/services/token.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfiguratorResolver } from './resolvers/configurator.resolver';

@Module({
    providers: [
        TokenService,
        UserService,
        ConfiguratorService,
        UserRepository,
        ConfiguratorRepository,
        ConfiguratorResolver,
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
export class ConfiguratorModule {}
