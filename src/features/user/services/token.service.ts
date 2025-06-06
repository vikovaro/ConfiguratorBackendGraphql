import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ITokens } from '../domain/entities/tokens.entity';

@Injectable()
export class TokenService {
    constructor(readonly jwtService: JwtService) {}

    async generateToken(userId: string, role: string): Promise<ITokens> {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    userId,
                    role,
                    type: 'Access',
                    date: Date.now(),
                },
                {
                    expiresIn: '30d',
                },
            ),
            this.jwtService.signAsync(
                {
                    userId,
                    role,
                    type: 'Refresh',
                    date: Date.now(),
                },
                {
                    expiresIn: '30d',
                },
            ),
        ]);

        return { accessToken, refreshToken };
    }
}
