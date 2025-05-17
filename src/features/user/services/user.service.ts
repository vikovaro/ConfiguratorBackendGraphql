import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { TokenService } from './token.service';
import { TokensResponse } from '../domain/dto/tokens.response';
import { IUserResponse } from '../domain/dto/user.response';
import { SignUpRequest } from '../domain/dto/sign-up.request';
import { Role } from '@prisma/client';
import { UpdateUserRequest } from '../domain/dto/update.request';
import * as bcrypt from 'bcryptjs';
import { MetricsService } from '../../../metrics/metrics.service';

@Injectable()
export class UserService {
    private readonly SALT_ROUNDS = 10;

    constructor(
        private readonly userRepository: UserRepository,
        private readonly tokenService: TokenService,
        private readonly metricsService: MetricsService,
    ) {}

    async getUserById(id: string): Promise<IUserResponse> {
        const user = await this.userRepository.getUserById(id);

        if (!user) {
            throw new NotFoundException('user-not-found');
        }

        return user;
    }

    async signUp(signUpDto: SignUpRequest): Promise<TokensResponse> {
        const existingUser = await this.userRepository.getUserByUsername(signUpDto.username);
        if (existingUser) {
            throw new UnauthorizedException('username-already-taken');
        }

        const hashedPassword = await bcrypt.hash(signUpDto.password, this.SALT_ROUNDS);

        const user = await this.userRepository.createUser(signUpDto, hashedPassword);

        const tokens = await this.tokenService.generateToken(user.id, Role.User);

        await this.userRepository.updateSession(user.id, tokens.accessToken, tokens.refreshToken);

        await this.metricsService.incUsersCount();

        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        };
    }

    async signIn(username: string, password: string): Promise<TokensResponse> {
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

    async refreshToken(refreshToken: string): Promise<TokensResponse> {
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

    async updateUser(updateRequest: UpdateUserRequest, userId: string): Promise<IUserResponse> {
        const existingUser = await this.userRepository.getUserById(updateRequest.userId);
        if (!existingUser) {
            throw new NotFoundException('user-not-found');
        }

        const requestOwner = await this.userRepository.getUserById(userId);

        if (updateRequest.userId !== userId && requestOwner.role !== Role.Admin) {
            throw new ForbiddenException('no-rights');
        }

        if (updateRequest.role && requestOwner.role !== Role.Admin) {
            throw new ForbiddenException('no-rights-for-updating-user-role');
        }

        if (updateRequest.password) {
            updateRequest.password = await bcrypt.hash(updateRequest.password, this.SALT_ROUNDS);
        }

        if (updateRequest.username && updateRequest.username !== existingUser.username) {
            const userWithSameUsername = await this.userRepository.getUserByUsername(
                updateRequest.username,
            );
            if (userWithSameUsername) {
                throw new BadRequestException('username-already-taken');
            }
        }

        return await this.userRepository.updateUser(updateRequest, userId);
    }
}
