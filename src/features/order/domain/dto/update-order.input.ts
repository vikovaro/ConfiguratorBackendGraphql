import { Field, InputType, Int } from '@nestjs/graphql';
import { EStatus } from '../domain/entities/status.enum';
import { TStatus } from '../enums/status.enum';

@InputType()
export class UpdateOrderInput implements IUpdateOrderInput {
    @Field(() => Int)
    orderId: number;

    @Field(() => Int, { nullable: true })
    configurationId?: number;

    @Field(() => String, { nullable: true })
    userId?: string;

    @Field(() => String, { nullable: true })
    address?: string;

    @Field(() => Date, { nullable: true })
    deliveryDate?: Date;

    @Field(() => EStatus, { nullable: true })
    status?: EStatus;
}

export interface IUpdateOrderInput {
    orderId: number;
    configurationId?: number;
    userId?: string;
    address?: string;
    deliveryDate?: Date;
    status?: TStatus;
}
