import { registerEnumType } from '@nestjs/graphql';

export enum ERole {
    Admin = 'Admin',
    User = 'User',
}

export type TRole = keyof typeof ERole;

registerEnumType(ERole, {
    name: 'ERole',
});
