import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Ram implements IRam {
    @Field(() => Int)
    id: number;

    @Field(() => String)
    name: string;

    @Field(() => String)
    manufacturer: string;

    @Field(() => Int)
    price: number;

    @Field(() => Int)
    capacity: number;
}

export interface IRam {
    id: number;
    name: string;
    manufacturer: string;
    price: number;
    capacity: number;
}
