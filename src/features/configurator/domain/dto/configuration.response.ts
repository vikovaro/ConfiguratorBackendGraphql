import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { CpuResponse, ICpuResponse } from './cpu.response';
import { GpuResponse, IGpuResponse } from './gpu.response';
import { IMotherBoardResponse, MotherBoardResponse } from './motherboard.response';
import { IPsuResponse, PsuResponse } from './psu.response';
import { IRamResponse, RamResponse } from './ram.response';

export class ConfigurationResponse implements IConfigurationResponse {
    @ApiProperty({ example: 1 })
    @Expose()
    id: number;

    @ApiPropertyOptional({ type: () => CpuResponse })
    @Exclude()
    cpu: CpuResponse;

    @ApiPropertyOptional({ type: () => GpuResponse })
    @Exclude()
    gpu: GpuResponse;

    @ApiPropertyOptional({ type: () => MotherBoardResponse })
    @Exclude()
    motherboard: MotherBoardResponse;

    @ApiPropertyOptional({ type: () => PsuResponse })
    @Exclude()
    psu: PsuResponse;

    @ApiPropertyOptional({ type: () => RamResponse })
    @Exclude()
    ram: RamResponse;

    @ApiProperty({ example: 1000 })
    @Expose()
    price: number;
}

export interface IConfigurationResponse {
    id: number;
    cpu: ICpuResponse;
    gpu: IGpuResponse;
    motherboard: IMotherBoardResponse;
    psu: IPsuResponse;
    ram: IRamResponse;
    price: number;
}
