import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Post,
    Req,
    SerializeOptions,
    UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { TokensResponse } from '../domain/dto/tokens.response';
import { UserService } from '../services/user.service';
import { AuthRestGuard } from '../../../guards/auth-rest.guard';
import { AuthRefreshRestGuard } from '../../../guards/auth-refresh.guad';
import { UserResponse } from '../domain/dto/user.response';
import { SignInRequest } from '../domain/dto/sign-in.request';
import { SignUpRequest } from '../domain/dto/sign-up.request';
import { UpdateUserRequest } from '../domain/dto/update.request';

@Controller('user')
@ApiTags('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/me')
    @UseGuards(AuthRestGuard)
    @ApiResponse({ status: HttpStatus.OK, description: 'getMe', type: UserResponse })
    @SerializeOptions({
        strategy: 'exposeAll',
        type: UserResponse,
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    })
    async getMe(@Req() req: Request) {
        return await this.userService.getUserById(req['data'].userId);
    }

    @Post('/register')
    @ApiResponse({ status: HttpStatus.OK, description: 'register', type: TokensResponse })
    @SerializeOptions({
        strategy: 'exposeAll',
        type: TokensResponse,
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    })
    async signUp(@Body() signUpDto: SignUpRequest) {
        return await this.userService.signUp(signUpDto);
    }

    @Post('/login')
    @ApiResponse({ status: HttpStatus.OK, description: 'login', type: TokensResponse })
    @SerializeOptions({
        strategy: 'exposeAll',
        type: TokensResponse,
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    })
    async signIn(@Body() signInDto: SignInRequest) {
        return await this.userService.signIn(signInDto.username, signInDto.password);
    }

    @Post('/refresh')
    @UseGuards(AuthRefreshRestGuard)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'getting a pair of the new JWT tokens (access & refresh)',
        type: TokensResponse,
    })
    @SerializeOptions({
        strategy: 'exposeAll',
        type: TokensResponse,
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    })
    async refreshToken(@Req() req: Request) {
        return await this.userService.refreshToken(req['data'].token);
    }

    @Post('/update')
    @UseGuards(AuthRestGuard)
    @ApiResponse({ status: HttpStatus.OK, description: 'update user', type: UserResponse })
    @SerializeOptions({
        strategy: 'exposeAll',
        type: UserResponse,
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    })
    async update(@Req() req: Request, @Body() updateRequest: UpdateUserRequest) {
        return await this.userService.updateUser(updateRequest, req['data'].userId);
    }
}
