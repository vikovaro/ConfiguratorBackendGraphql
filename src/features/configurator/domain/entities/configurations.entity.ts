import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Configuration, IConfiguration } from './configuration.entity';

@ObjectType()
export class Configurations implements IConfigurations {
    @Field(() => Int)
    count: number;
    @Field(() => [Configuration])
    configurations: Configuration[];
}

export interface IConfigurations {
    count: number;
    configurations: IConfiguration[];
}
