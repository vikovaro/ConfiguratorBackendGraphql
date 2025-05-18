import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { TokenService } from './token.service';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { MetricsService } from '../../../metrics/metrics.service';
import { IUser } from '../domain/entities/user.entity';
import { SignUpInput } from '../domain/dto/sign-up.input';
import { ITokens } from '../domain/entities/tokens.entity';
import { UpdateUserInput } from '../domain/dto/update-user.input';

@Injectable()
export class UserService {
    private readonly SALT_ROUNDS = 10;

    constructor(
        private readonly userRepository: UserRepository,
        private readonly tokenService: TokenService,
        private readonly metricsService: MetricsService,
    ) {}

    async getUserById(id: string): Promise<IUser> {
        const user = await this.userRepository.getUserById(id);

        if (!user) {
            throw new NotFoundException('user-not-found');
        }

        return user;
    }

    async signUp(signUpInput: SignUpInput): Promise<ITokens> {
        const existingUser = await this.userRepository.getUserByUsername(signUpInput.username);
        if (existingUser) {
            throw new UnauthorizedException('username-already-taken');
        }

        const hashedPassword = await bcrypt.hash(signUpInput.password, this.SALT_ROUNDS);

        const user = await this.userRepository.createUser(signUpInput, hashedPassword);

        const tokens = await this.tokenService.generateToken(user.id, Role.User);

        await this.userRepository.updateSession(user.id, tokens.accessToken, tokens.refreshToken);

        await this.metricsService.incUsersCount();

        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }

    async signIn(username: string, password: string): Promise<ITokens> {
        const user = await this.userRepository.getUserByUsername(username);

        if (!user) {
            throw new NotFoundException('user-not-found');
        }

        const userPassword = (await this.userRepository.getUserWithPassword(user.id)).password;

        const isPasswordValid = await bcrypt.compare(password, userPassword);
        if (!isPasswordValid) {
            throw new UnauthorizedException('invalid-password');
        }

        const tokens = await this.tokenService.generateToken(user.id, user.role);

        await this.userRepository.updateSession(user.id, tokens.accessToken, tokens.refreshToken);

        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }

    async refreshToken(refreshToken: string): Promise<ITokens> {
        const session = await this.userRepository.getSessionByRefreshToken(refreshToken);
        if (!session) {
            throw new UnauthorizedException();
        }

        const user = await this.userRepository.getUserById(session.userId);

        const tokens = await this.tokenService.generateToken(user.id, user.role);

        await this.userRepository.updateSession(user.id, tokens.accessToken, tokens.refreshToken);

        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }

    async updateUser(updateUserInput: UpdateUserInput, userId: string): Promise<IUser> {
        const existingUser = await this.userRepository.getUserById(updateUserInput.userId);
        if (!existingUser) {
            throw new NotFoundException('user-not-found');
        }

        const requestOwner = await this.userRepository.getUserById(userId);

        if (updateUserInput.userId !== userId && requestOwner.role !== Role.Admin) {
            throw new ForbiddenException('no-rights');
        }

        if (updateUserInput.role && requestOwner.role !== Role.Admin) {
            throw new ForbiddenException('no-rights-for-updating-user-role');
        }

        if (updateUserInput.password) {
            updateUserInput.password = await bcrypt.hash(
                updateUserInput.password,
                this.SALT_ROUNDS,
            );
        }

        if (updateUserInput.username && updateUserInput.username !== existingUser.username) {
            const userWithSameUsername = await this.userRepository.getUserByUsername(
                updateUserInput.username,
            );
            if (userWithSameUsername) {
                throw new BadRequestException('username-already-taken');
            }
        }

        return await this.userRepository.updateUser(updateUserInput, userId);
    }
}
