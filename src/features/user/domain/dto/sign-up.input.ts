import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignUpInput implements ISignUpInput {
    @Field(() => String)
    username: string;

    @Field(() => String)
    name: string;

    @Field(() => String)
    phone: string;

    @Field(() => String)
    email: string;

    @Field(() => String)
    password: string;
}

export interface ISignUpInput {
    username: string;
    name: string;
    phone: string;
    email: string;
    password: string;
}
