import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateOrderInput {
    @Field(() => Int)
    configurationId: number;

    @Field(() => String)
    address: string;
}
