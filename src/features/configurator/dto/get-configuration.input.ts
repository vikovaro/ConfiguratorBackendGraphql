import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetConfigurationInput {
    @Field(() => Number)
    id: number;
}
