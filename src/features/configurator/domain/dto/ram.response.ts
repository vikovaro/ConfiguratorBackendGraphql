import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class RamResponse implements IRamResponse {
    @ApiProperty({ example: 1 })
    @Expose()
    id: number;

    @ApiProperty({ example: 'rog' })
    @Expose()
    name: string;

    @ApiProperty({ example: 1000 })
    @Expose()
    manufacturer: string;

    @ApiProperty({ example: 1000 })
    @Expose()
    price: number;

    @ApiProperty({ example: 8 })
    @Expose()
    capacity: number;
}

export interface IRamResponse {
    id: number;
    name: string;
    manufacturer: string;
    capacity: number;
    price: number;
}
