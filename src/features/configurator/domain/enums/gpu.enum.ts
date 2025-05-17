import { registerEnumType } from '@nestjs/graphql';

export enum EGpuVariants {
    AMD = 'AMD',
    Intel = 'Intel',
    Nvidia = 'Nvidia',
}
registerEnumType(EGpuVariants, {
    name: 'EGpuVariants',
});
