import {
    Configuration,
    IConfiguration,
} from '../../../configurator/domain/entities/configuration.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IUser, User } from 'src/features/user/domain/entities/user.entity';
import { EStatus, TStatus } from '../enums/status.enum';

@ObjectType()
export class Order implements IOrder {
    @Field(() => Int)
    id: number;

    @Field(() => Date)
    orderDate: Date;

    @Field(() => Date, { nullable: true })
    deliveryDate?: Date;

    @Field(() => String)
    address: string;

    @Field(() => EStatus, { nullable: true })
    status: EStatus;

    @Field(() => Configuration, { nullable: true })
    configuration: Configuration;

    @Field(() => User, { nullable: true })
    user: User;
}

export interface IOrder {
    id: number;
    orderDate: Date;
    deliveryDate?: Date;
    address: string;
    status: TStatus;
    configuration: IConfiguration;
    user: IUser;
}
