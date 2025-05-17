import { ConfigurationResponse, IConfigurationResponse } from './configuration.response';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class GetConfigurationsResponse implements IGetConfigurationResponse {
    @ApiProperty({ example: 10 })
    @Expose()
    count: number;

    @ApiPropertyOptional({ isArray: true, type: () => ConfigurationResponse, nullable: true })
    @Exclude()
    configurations: ConfigurationResponse[];
}

export interface IGetConfigurationResponse {
    configurations: IConfigurationResponse[];
    count: number;
}
