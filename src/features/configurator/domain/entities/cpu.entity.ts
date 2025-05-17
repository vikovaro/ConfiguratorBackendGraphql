import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CpuEntity {
    @Field(() => Int)
    id: number;

    @Field(() => String)
    name: string;

    @Field(() => String)
    manufacturer: string;

    @Field(() => String)
    socket: string;

    @Field(() => Int)
    wattage: number;

    @Field(() => Int)
    price: number;

    @Field(() => Float)
    frequency: number;
}
