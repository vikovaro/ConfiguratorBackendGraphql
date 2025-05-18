import { Injectable } from '@nestjs/common';
import { PrismaClient, Role } from '@prisma/client';
import { ISession } from '../domain/entities/session.entity';
import { SignUpInput } from '../domain/dto/sign-up.input';
import { IUser } from '../domain/entities/user.entity';
import { UpdateUserInput } from '../domain/dto/update-user.input';
@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaClient) {}

    BASE_USER_SELECT = {
        id: true,
        email: true,
        username: true,
        role: true,
        name: true,
        phone: true,
        createdAt: true,
    };

    async getUserById(id: string): Promise<IUser> {
        return this.prisma.user.findUnique({
            where: { id: id },
            select: this.BASE_USER_SELECT,
        });
    }

    async getUserByUsername(username: string): Promise<IUser> {
        return this.prisma.user.findUnique({
            where: { username: username },
            select: this.BASE_USER_SELECT,
        });
    }

    async getUserWithPassword(id: string) {
        return this.prisma.user.findUnique({
            where: { id: id },
        });
    }

    async createUser(signUpInput: SignUpInput, password: string): Promise<IUser> {
        return this.prisma.user.create({
            data: {
                username: signUpInput.username,
                name: signUpInput.name,
                email: signUpInput.email,
                phone: signUpInput.phone,
                password: password,
                role: Role.User,
            },
            select: this.BASE_USER_SELECT,
        });
    }

    async getSessionByRefreshToken(refreshToken: string): Promise<ISession> {
        return this.prisma.session.findUnique({
            where: { refreshToken: refreshToken },
        });
    }

    async updateSession(
        userId: string,
        accessToken: string,
        refreshToken: string,
    ): Promise<ISession> {
        return this.prisma.session.upsert({
            where: {
                userId: userId,
            },
            update: {
                accessToken: accessToken,
                refreshToken: refreshToken,
                updatedAt: new Date(),
            },
            create: {
                accessToken: accessToken,
                refreshToken: refreshToken,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
    }

    async updateUser(updateUserInput: UpdateUserInput, userId: string): Promise<IUser> {
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                username: updateUserInput.username ? updateUserInput.username : undefined,
                name: updateUserInput.name ? updateUserInput.name : undefined,
                phone: updateUserInput.phone ? updateUserInput.phone : undefined,
                email: updateUserInput.email ? updateUserInput.email : undefined,
                password: updateUserInput.password ? updateUserInput.password : undefined,
            },
            select: this.BASE_USER_SELECT,
        });
    }
}
