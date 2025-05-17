import { IUser, IUserResponse, UserResponse } from '../../../user/domain/entities/user.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { EStatus, TStatus } from '../models/status.enum';
import { ConfigurationEntity } from '../../../configurator/domain/entities/configuration.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Order {
    @Field(() => Int)
    id: number;


}

export interface IOrder {
    id: number;
    orderDate: Date;
    deliveryDate?: Date;
    address: string;
    status: TStatus;
    configuration: ;
    user: IUser;
}
