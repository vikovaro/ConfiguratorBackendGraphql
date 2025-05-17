import { Field, InputType, Int } from '@nestjs/graphql';
import { IsOptional, IsPositive } from 'class-validator';
import { ECpuVariants } from '../enums/cpu.enum';
import { EGpuVariants } from '../enums/gpu.enum';

@InputType()
export class CreateConfigurationInput {
    @Field(() => Int)
    price: number;

    @Field(() => ECpuVariants, { nullable: true })
    @IsOptional()
    cpu?: ECpuVariants;

    @Field(() => EGpuVariants, { nullable: true })
    @IsOptional()
    gpu?: string;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsPositive()
    ram?: number;
}
