import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, MaxLength, Min, MinLength } from 'class-validator';

export class CreateOrderRequest implements ICreateOrderRequest {
    @ApiProperty({ example: 1 })
    @IsInt()
    @Min(0)
    configurationId: number;

    @ApiProperty({ example: 'Revolution Square, Building 1' })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    address: string;
}

export interface ICreateOrderRequest {
    configurationId: number;
    address: string;
}
