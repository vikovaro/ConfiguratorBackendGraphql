import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignInInput implements ISignInInput {
    @Field(() => String)
    username: string;

    @Field(() => String)
    password: string;
}

export interface ISignInInput {
    username: string;
    password: string;
}
