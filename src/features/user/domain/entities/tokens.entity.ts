import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Tokens implements ITokens {
    @Field(() => String)
    accessToken: string;

    @Field(() => String)
    refreshToken: string;
}

export interface ITokens {
    accessToken: string;
    refreshToken: string;
}
