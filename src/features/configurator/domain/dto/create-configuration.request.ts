import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ECpuVariants } from '../models/cpu.type.enum';
import { EGpuVariants } from '../models/gpu.type.enum';

export class CreateConfigurationRequest {
    @ApiProperty({ example: 1000 })
    @IsInt()
    @Min(1)
    price: number;

    @ApiProperty({ example: 'Intel' })
    @IsString()
    @IsOptional()
    @IsEnum(ECpuVariants)
    cpu?: string;

    @ApiProperty({ example: 'Nvidia' })
    @IsString()
    @IsOptional()
    @IsEnum(EGpuVariants)
    gpu?: string;

    @ApiProperty({ example: 1000 })
    @IsInt()
    @IsOptional()
    ram?: number;
}
