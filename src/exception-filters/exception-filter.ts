import {
    Injectable,
    HttpException,
    HttpStatus,
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    BadRequestException,
    ForbiddenException,
    UnauthorizedException,
    NotFoundException,
} from '@nestjs/common';
import { ConfiguratorException } from '../errors/configurator-exception';
import { GraphQLError } from 'graphql/error';

@Injectable()
@Catch()
export class ExceptionsFilter implements ExceptionFilter {
    readonly ignoredExceptions = [
        NotFoundException,
        ForbiddenException,
        UnauthorizedException,
        BadRequestException,
    ];

    catch(exception: any, host: ArgumentsHost) {
        const type = host.getType<'http' | 'graphql'>();

        if (type === 'graphql') {
            if (exception instanceof ConfiguratorException) {
                return new GraphQLError(exception.message, {
                    extensions: {
                        code: 'BAD_REQUEST',
                        status: HttpStatus.BAD_REQUEST,
                    },
                });
            }

            if (exception instanceof HttpException) {
                return new GraphQLError(exception.message, {
                    extensions: {
                        code: this.getErrorCode(exception.getStatus()),
                        status: exception.getStatus(),
                    },
                });
            }

            const isIgnored = this.ignoredExceptions.some(
                (ignored) => exception instanceof ignored,
            );

            if (isIgnored && exception instanceof BadRequestException) {
                const response = exception.getResponse();
                return new GraphQLError(
                    Array.isArray(response['message'])
                        ? response['message'][0]
                        : response['message'],
                    {
                        extensions: {
                            code: 'BAD_USER_INPUT',
                            status: HttpStatus.BAD_REQUEST,
                        },
                    },
                );
            }

            return new GraphQLError(isIgnored ? exception.message : 'Internal server error', {
                extensions: {
                    code: isIgnored ? 'GRAPHQL_VALIDATION_FAILED' : 'INTERNAL_SERVER_ERROR',
                    status: isIgnored ? HttpStatus.BAD_REQUEST : HttpStatus.INTERNAL_SERVER_ERROR,
                },
            });
        }

        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        if (exception instanceof ConfiguratorException) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: HttpStatus.BAD_REQUEST,
                message: exception.message,
            });
        }

        const isIgnoredException = this.ignoredExceptions.some(
            (ignoredException) => exception instanceof ignoredException,
        );

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        let message: string;
        if (isIgnoredException) {
            if (exception instanceof BadRequestException) {
                const response = exception.getResponse();
                message = Array.isArray(response['message'])
                    ? response['message'][0]
                    : response['message'];
            } else {
                message = exception.message;
            }
        } else {
            console.error('Unhandled exception:', exception);
            message = 'Internal server error';
        }

        return response.status(status).json({
            statusCode: status,
            message: message,
        });
    }

    private getErrorCode(status: number): string {
        switch (status) {
            case HttpStatus.BAD_REQUEST:
                return 'BAD_REQUEST';
            case HttpStatus.UNAUTHORIZED:
                return 'UNAUTHORIZED';
            case HttpStatus.FORBIDDEN:
                return 'FORBIDDEN';
            case HttpStatus.NOT_FOUND:
                return 'NOT_FOUND';
            default:
                return 'INTERNAL_SERVER_ERROR';
        }
    }
}
