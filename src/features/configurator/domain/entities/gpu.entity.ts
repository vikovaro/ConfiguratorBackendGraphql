import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Gpu implements IGpu {
    @Field(() => Int)
    id: number;

    @Field(() => String)
    manufacturer: string;

    @Field(() => Int)
    price: number;

    @Field(() => Int)
    wattage: number;

    @Field(() => Float)
    frequency: number;

    @Field(() => String)
    port: string;
}

export interface IGpu {
    id: number;
    manufacturer: string;
    price: number;
    wattage: number;
    frequency: number;
    port: string;
}
