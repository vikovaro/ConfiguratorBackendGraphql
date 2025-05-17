import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PsuEntity {
    @Field(() => Int)
    id: number;

    @Field(() => String)
    name: string;

    @Field(() => String)
    manufacturer: string;

    @Field(() => Int)
    wattage: number;

    @Field(() => Int)
    price: number;
}
