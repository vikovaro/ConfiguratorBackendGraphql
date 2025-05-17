import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CpuEntity } from './cpu.entity';
import { GpuEntity } from './gpu.entity';
import { MotherBoardEntity } from './motherboard.entity';
import { PsuEntity } from './psu.entity';
import { RamEntity } from './ram.entity';

@ObjectType()
export class ConfigurationEntity {
    @Field(() => Int)
    id: number;

    @Field(() => CpuEntity)
    cpu: CpuEntity;

    @Field(() => GpuEntity)
    gpu: GpuEntity;

    @Field(() => MotherBoardEntity)
    motherboard: MotherBoardEntity;

    @Field(() => PsuEntity)
    psu: PsuEntity;

    @Field(() => RamEntity)
    ram: RamEntity;

    @Field(() => Int)
    price: number;
}
