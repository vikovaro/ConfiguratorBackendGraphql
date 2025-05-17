import {
    ConfigurationResponse,
    IConfigurationResponse,
} from '../../../configurator/domain/dto/configuration.response';
import { IUserResponse, UserResponse } from '../../../user/domain/dto/user.response';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { EStatus, TStatus } from '../models/status.enum';

export class OrderResponse implements IOrderResponse {
    @ApiProperty({ example: 1 })
    @Expose()
    id: number;

    @ApiProperty({ example: 1 })
    @Expose()
    orderDate: Date;

    @ApiProperty({ example: 1 })
    @Expose()
    deliveryDate?: Date;

    @ApiProperty({ example: 'Revolution Square, Building 1' })
    @Expose()
    address: string;

    @ApiProperty({ enum: EStatus })
    @Expose()
    status: EStatus;

    @ApiPropertyOptional({ type: () => ConfigurationResponse })
    @Expose()
    configuration: ConfigurationResponse;

    @ApiPropertyOptional({ type: () => UserResponse })
    @Expose()
    user: IUserResponse;
}

export interface IOrderResponse {
    id: number;
    orderDate: Date;
    deliveryDate?: Date;
    address: string;
    status: TStatus;
    configuration: IConfigurationResponse;
    user: IUserResponse;
}
