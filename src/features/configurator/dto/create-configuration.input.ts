import { Field, InputType, Int } from '@nestjs/graphql';
import { IsPositive } from 'class-validator';

@InputType()
export class CreateConfigurationInput {
    @Field(() => Int)
    price: number;

    @Field(() => String, { nullable: true })
    cpu?: string;

    @Field(() => String, { nullable: true })
    gpu?: string;

    @Field(() => Int, { nullable: true })
    @IsPositive()
    ram?: number;
}
