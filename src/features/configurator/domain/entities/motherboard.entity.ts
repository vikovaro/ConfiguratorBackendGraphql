import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MotherBoardEntity {
    @Field(() => Int)
    id: number;

    @Field(() => String)
    name: string;

    @Field(() => String)
    manufacturer: string;

    @Field(() => Int)
    price: number;

    @Field(() => String)
    socket: string;

    @Field(() => String)
    chipset: string;

    @Field(() => String)
    cpuManufacturer: string;

    @Field(() => String)
    port: string;
}
