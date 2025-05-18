import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { Configuration, IConfiguration } from '../domain/entities/configuration.entity';
import { Cpu, ICpu } from '../domain/entities/cpu.entity';
import { Gpu, IGpu } from '../domain/entities/gpu.entity';
import { IMotherBoard, MotherBoard } from '../domain/entities/motherboard.entity';
import { IPsu, Psu } from '../domain/entities/psu.entity';
import { IRam, Ram } from '../domain/entities/ram.entity';
import { IConfigurations } from '../domain/entities/configurations.entity';

@Injectable()
export class ConfiguratorRepository {
    constructor(
        private readonly prisma: PrismaClient,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    BASE_CONFIGURATOR_INCLUDE = {
        cpu: true,
        gpu: true,
        motherboard: true,
        psu: true,
        ram: true,
    };

    async getConfigurationFromCache(id: number): Promise<IConfiguration> {
        return await this.cacheManager.get(`configuration-${id}`);
    }

    async getConfigurationFromDb(id: number): Promise<IConfiguration> {
        return this.prisma.configuration.findUnique({
            where: {
                id: id,
            },
            include: {
                ...this.BASE_CONFIGURATOR_INCLUDE,
            },
        });
    }

    async saveConfiguration(configuration: Configuration): Promise<IConfiguration> {
        const newConfiguration = await this.prisma.configuration.create({
            data: {
                cpuId: configuration.cpu.id,
                gpuId: configuration.gpu.id,
                motherboardId: configuration.motherboard.id,
                psuId: configuration.psu.id,
                ramId: configuration.ram.id,
                price: configuration.price,
            },
            include: {
                ...this.BASE_CONFIGURATOR_INCLUDE,
            },
        });

        await this.cacheManager.set(
            `configuration-${newConfiguration.id}`,
            newConfiguration,
            60 * 60 * 1000,
        );

        return newConfiguration;
    }

    async getAllConfiguration(limit: number, offset: number): Promise<IConfigurations> {
        const configurations = await this.prisma.configuration.findMany({
            skip: offset,
            take: limit,
            include: {
                ...this.BASE_CONFIGURATOR_INCLUDE,
            },
        });

        const totalCount = await this.prisma.configuration.count();

        return {
            configurations: configurations,
            count: totalCount,
        };
    }

    async getAllCpus(): Promise<ICpu[]> {
        return this.prisma.cpu.findMany();
    }

    async getAllGpus(): Promise<IGpu[]> {
        return this.prisma.gpu.findMany();
    }

    async getAllMotherBoards(): Promise<IMotherBoard[]> {
        return this.prisma.motherboard.findMany();
    }

    async getAllPsus(): Promise<IPsu[]> {
        return this.prisma.psu.findMany();
    }

    async getAllRam(): Promise<IRam[]> {
        return this.prisma.ram.findMany();
    }
}
