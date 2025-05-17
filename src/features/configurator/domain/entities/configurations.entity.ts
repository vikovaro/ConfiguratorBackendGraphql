import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ConfigurationEntity } from './configuration.entity';

@ObjectType()
export class ConfigurationsEntity {
    @Field(() => Int)
    count: number;
    @Field(() => [ConfigurationEntity])
    configurations: ConfigurationEntity[];
}
