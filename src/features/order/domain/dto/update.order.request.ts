import { ApiProperty } from '@nestjs/swagger';
import {
    IsEnum,
    IsInt,
    IsOptional,
    IsString,
    IsUUID,
    MaxLength,
    Min,
    MinLength,
} from 'class-validator';
import { EStatus, TStatus } from '../models/status.enum';

export class UpdateOrderRequest implements IUpdateOrderRequest {
    @ApiProperty({ example: 1 })
    @IsInt()
    @Min(0)
    orderId: number;

    @ApiProperty({ example: 1 })
    @IsInt()
    @IsOptional()
    @Min(0)
    configurationId?: number;

    @ApiProperty({ example: '4da06a83-abf8-4f00-9423-fc06acd0f21d' })
    @IsUUID()
    @IsOptional()
    userId?: string;

    @ApiProperty({ example: 'Revolution Square, Building 1' })
    @IsString()
    @IsOptional()
    @MinLength(6)
    @MaxLength(50)
    address?: string;

    @ApiProperty({ example: '2024-10-16T13:06:00.339+03:00' })
    @IsOptional()
    deliveryDate?: Date;

    @ApiProperty({ enum: EStatus })
    @IsOptional()
    @IsEnum(EStatus)
    status?: EStatus;
}

export interface IUpdateOrderRequest {
    orderId: number;
    configurationId?: number;
    userId?: string;
    address?: string;
    deliveryDate?: Date;
    status?: TStatus;
}
