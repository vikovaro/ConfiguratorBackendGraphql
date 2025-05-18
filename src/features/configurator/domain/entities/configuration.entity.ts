import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Cpu, ICpu } from './cpu.entity';
import { Gpu, IGpu } from './gpu.entity';
import { IMotherBoard, MotherBoard } from './motherboard.entity';
import { IPsu, Psu } from './psu.entity';
import { IRam, Ram } from './ram.entity';

@ObjectType()
export class Configuration implements IConfiguration {
    @Field(() => Int)
    id: number;

    @Field(() => Cpu)
    cpu: Cpu;

    @Field(() => Gpu)
    gpu: Gpu;

    @Field(() => MotherBoard)
    motherboard: MotherBoard;

    @Field(() => Psu)
    psu: Psu;

    @Field(() => Ram)
    ram: Ram;

    @Field(() => Int)
    price: number;
}

export interface IConfiguration {
    id: number;
    cpu: ICpu;
    gpu: IGpu;
    motherboard: IMotherBoard;
    psu: IPsu;
    ram: IRam;
    price: number;
}
