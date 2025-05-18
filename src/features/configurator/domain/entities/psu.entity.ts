import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Psu implements IPsu {
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

export interface IPsu {
    id: number;
    name: string;
    manufacturer: string;
    wattage: number;
    price: number;
}
