import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PsuResponse implements IPsuResponse {
    @ApiProperty({ example: 1 })
    @Expose()
    id: number;

    @ApiProperty({ example: 'SilentPro' })
    @Expose()
    name: string;

    @ApiProperty({ example: 1000 })
    @Expose()
    manufacturer: string;

    @ApiProperty({ example: 1000 })
    @Expose()
    wattage: number;

    @ApiProperty({ example: 1000 })
    @Expose()
    price: number;
}

export interface IPsuResponse {
    id: number;
    name: string;
    manufacturer: string;
    wattage: number;
    price: number;
}
