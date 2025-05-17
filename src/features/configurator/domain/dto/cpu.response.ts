import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CpuResponse implements ICpuResponse {
    @ApiProperty({ example: 1 })
    @Expose()
    id: number;

    @ApiProperty({ example: 'i7-12700' })
    @Expose()
    name: string;

    @ApiProperty({ example: 1000 })
    @Expose()
    manufacturer: string;

    @ApiProperty({ example: 'AM4' })
    @Expose()
    socket: string;

    @ApiProperty({ example: 1000 })
    @Expose()
    wattage: number;

    @ApiProperty({ example: 1000 })
    @Expose()
    price: number;

    @ApiProperty({ example: 3.8 })
    @Expose()
    frequency: number;
}

export interface ICpuResponse {
    id: number;
    name: string;
    manufacturer: string;
    socket: string;
    wattage: number;
    price: number;
    frequency: number;
}
