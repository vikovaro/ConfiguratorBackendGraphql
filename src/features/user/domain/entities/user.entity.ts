import { ERole, TRole } from '../enums/role.enum';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User implements IUser {
    @Field(() => String)
    id: string;

    @Field(() => String)
    username: string;

    @Field(() => String)
    name: string;

    @Field(() => String)
    phone: string;

    @Field(() => String)
    email: string;

    @Field(() => ERole, { nullable: true })
    role: ERole;

    @Field(() => Date)
    createdAt: Date;
}

export interface IUser {
    id: string;
    username: string;
    name: string;
    phone: string;
    email: string;
    role: TRole;
    createdAt: Date;
}
