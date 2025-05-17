import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GpuResponse implements IGpuResponse {
    @ApiProperty({ example: 1 })
    @Expose()
    id: number;

    @ApiProperty({ example: 1000 })
    @Expose()
    manufacturer: string;

    @ApiProperty({ example: 1000 })
    @Expose()
    price: number;

    @ApiProperty({ example: 1000 })
    @Expose()
    wattage: number;

    @ApiProperty({ example: 3.8 })
    @Expose()
    frequency: number;

    @ApiProperty({ example: 'PCI-E4' })
    @Expose()
    port: string;
}

export interface IGpuResponse {
    id: number;
    manufacturer: string;
    price: number;
    wattage: number;
    frequency: number;
    port: string;
}
