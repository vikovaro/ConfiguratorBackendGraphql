import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateOrderRequestInput {
    @Field(() => Int)
    configurationId: number;

    @Field(() => String)
    address: string;
}
