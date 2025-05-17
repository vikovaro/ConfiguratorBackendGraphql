import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Session implements ISession {
    @Field(() => String)
    accessToken: string;

    @Field(() => String)
    refreshToken: string;

    @Field(() => String)
    userId: string;
}

export interface ISession {
    accessToken: string;
    refreshToken: string;
    userId: string;
}
