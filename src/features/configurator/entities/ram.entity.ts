import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RamEntity {
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
