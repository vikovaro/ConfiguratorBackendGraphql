import { Field, InputType, Int } from '@nestjs/graphql';
import { IsPositive, Min } from 'class-validator';

@InputType()
export class GetConfigurationsInput {
    @Field(() => Int)
    @IsPositive()
    limit: number;
    @Field(() => Int)
    @Min(0)
    offset: number;
}
