import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GpuEntity {
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
