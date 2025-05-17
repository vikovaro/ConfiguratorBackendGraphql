import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { ConfigurationEntity, ConfigurationsEntity } from '../domain/entities/configuration.entity';
import { CpuEntity } from '../domain/entities/cpu.entity';
import { GpuEntity } from '../domain/entities/gpu.entity';
import { MotherBoardEntity } from '../domain/entities/motherboard.entity';
import { PsuEntity } from '../domain/entities/psu.entity';
import { RamEntity } from '../domain/entities/ram.entity';

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

    async getConfigurationFromCache(id: number): Promise<ConfigurationEntity> {
        return await this.cacheManager.get(`configuration-${id}`);
    }

    async getConfigurationFromDb(id: number): Promise<ConfigurationEntity> {
        return this.prisma.configuration.findUnique({
            where: {
                id: id,
            },
            include: {
                ...this.BASE_CONFIGURATOR_INCLUDE,
            },
        });
    }

    async saveConfiguration(configuration: ConfigurationEntity): Promise<ConfigurationEntity> {
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

    async getAllConfiguration(limit: number, offset: number): Promise<ConfigurationsEntity> {
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

    async getAllCpus(): Promise<CpuEntity[]> {
        return this.prisma.cpu.findMany();
    }

    async getAllGpus(): Promise<GpuEntity[]> {
        return this.prisma.gpu.findMany();
    }

    async getAllMotherBoards(): Promise<MotherBoardEntity[]> {
        return this.prisma.motherboard.findMany();
    }

    async getAllPsus(): Promise<PsuEntity[]> {
        return this.prisma.psu.findMany();
    }

    async getAllRam(): Promise<RamEntity[]> {
        return this.prisma.ram.findMany();
    }
}
