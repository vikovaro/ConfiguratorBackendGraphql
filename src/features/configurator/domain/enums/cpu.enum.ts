import { registerEnumType } from '@nestjs/graphql';

export enum ECpuVariants {
    AMD = 'AMD',
    Intel = 'Intel',
}

registerEnumType(ECpuVariants, {
    name: 'ECpuVariants',
});
