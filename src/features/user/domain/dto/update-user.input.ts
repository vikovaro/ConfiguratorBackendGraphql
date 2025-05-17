import { ERole, TRole } from '../enums/role.enum';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput implements IUpdateUserInput {
    @Field(() => String)
    userId: string;

    @Field(() => String, { nullable: true })
    login?: string;

    @Field(() => String, { nullable: true })
    name?: string;

    @Field(() => String, { nullable: true })
    phone?: string;

    @Field(() => String, { nullable: true })
    email?: string;

    @Field(() => String, { nullable: true })
    password?: string;

    @Field(() => ERole, { nullable: true })
    role?: ERole;
}

export interface IUpdateUserInput {
    userId: string;
    login?: string;
    name?: string;
    phone?: string;
    email?: string;
    password?: string;
    role?: TRole;
}
