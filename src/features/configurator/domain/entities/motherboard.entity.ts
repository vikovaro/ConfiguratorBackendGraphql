import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MotherBoard implements IMotherBoard {
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

export interface IMotherBoard {
    id: number;
    name: string;
    manufacturer: string;
    price: number;
    socket: string;
    chipset: string;
    cpuManufacturer: string;
    port: string;
}
