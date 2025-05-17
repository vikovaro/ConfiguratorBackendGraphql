import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class MotherBoardResponse implements IMotherBoardResponse {
    @ApiProperty({ example: 1 })
    @Expose()
    id: number;

    @ApiProperty({ example: 'ASUS ROG' })
    @Expose()
    name: string;

    @ApiProperty({ example: 1000 })
    @Expose()
    manufacturer: string;

    @ApiProperty({ example: 1000 })
    @Expose()
    price: number;

    @ApiProperty({ example: 'AM4' })
    @Expose()
    socket: string;

    @ApiProperty({ example: 'A320' })
    @Expose()
    chipset: string;

    @ApiProperty({ example: 'AMD' })
    @Exclude()
    cpuManufacturer: string;

    @ApiProperty({ example: 'PCI-E3' })
    @Expose()
    port: string;
}

export interface IMotherBoardResponse {
    id: number;
    name: string;
    manufacturer: string;
    price: number;
    socket: string;
    port: string;
    chipset: string;
    cpuManufacturer: string;
}
