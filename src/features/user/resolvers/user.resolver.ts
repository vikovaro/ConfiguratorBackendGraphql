import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGraphqlGuard } from 'src/guards/auth-grapql.guard';
import { User } from '../domain/entities/user.entity';
import { GraphqlReq } from 'src/decorators/graphql-req.decorator';
import { SignUpInput } from '../domain/dto/sign-up.input';
import { Tokens } from '../domain/entities/tokens.entity';
import { SignInInput } from '../domain/dto/sign-in.input';
import { UpdateUserInput } from '../domain/dto/update-user.input';
import { UserService } from '../services/user.service';
import { AuthRefreshGraphqlGuard } from 'src/guards/auth-refresh-graphql.guard';

@Resolver()
export class UserResolver {
    constructor(private readonly userService: UserService) {}

    @Query(() => User, { name: 'getMe' })
    @UseGuards(AuthGraphqlGuard)
    async getMe(@GraphqlReq() req: Request) {
        return await this.userService.getUserById(req['data'].userId);
    }

    @Mutation(() => Tokens, { name: 'signUp' })
    @UseGuards(AuthGraphqlGuard)
    async signUp(@GraphqlReq() req: Request, @Args('signUp') signUpInput: SignUpInput) {
        return await this.userService.signUp(signUpInput);
    }

    @Mutation(() => Tokens, { name: 'signIn' })
    @UseGuards(AuthGraphqlGuard)
    async signIn(@GraphqlReq() req: Request, @Args('signIn') signInInput: SignInInput) {
        return await this.userService.signIn(signInInput.username, signInInput.password);
    }

    @Mutation(() => Tokens, { name: 'refresh' })
    @UseGuards(AuthRefreshGraphqlGuard)
    async refresh(@GraphqlReq() req: Request) {
        return await this.userService.refreshToken(req['data'].token);
    }

    @Mutation(() => Tokens, { name: 'update' })
    @UseGuards(AuthGraphqlGuard)
    async updateUser(
        @GraphqlReq() req: Request,
        @Args('updateUser') updateUserInput: UpdateUserInput,
    ) {
        return await this.userService.updateUser(updateUserInput, req['data'].userId);
    }
}
