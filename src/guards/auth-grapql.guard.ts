import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserRepository } from '../features/user/repositories/user.repository';

@Injectable()
export class AuthGraphqlGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        readonly userRepository: UserRepository,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext().req;
        const token = this.extractTokenFromHeader(request);

        let data;
        try {
            data = await this.jwtService.verifyAsync(token);
        } catch {
            throw new UnauthorizedException('jwt-expired');
        }

        request['data'] = data;
        if (request['data'].type !== 'Access') {
            throw new UnauthorizedException();
        }

        if (!data.userId) {
            return false;
        }
        const user = await this.userRepository.getUserById(data.userId);
        return !!user;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
