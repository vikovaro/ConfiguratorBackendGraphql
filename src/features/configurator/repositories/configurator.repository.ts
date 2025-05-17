import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { IConfigurationResponse } from '../domain/dto/configuration.response';
import { ICpuResponse } from '../domain/dto/cpu.response';
import { IGpuResponse } from '../domain/dto/gpu.response';
import { IMotherBoardResponse } from '../domain/dto/motherboard.response';
import { IPsuResponse } from '../domain/dto/psu.response';
import { IRamResponse } from '../domain/dto/ram.response';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { IGetConfigurationResponse } from '../domain/dto/get-configurations.response';

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

    async getConfigurationFromCache(id: number): Promise<IConfigurationResponse> {
        return await this.cacheManager.get(`configuration-${id}`);
    }

    async getConfigurationFromDb(id: number): Promise<IConfigurationResponse> {
        return this.prisma.configuration.findUnique({
            where: {
                id: id,
            },
            include: {
                ...this.BASE_CONFIGURATOR_INCLUDE,
            },
        });
    }

    async saveConfiguration(
        configuration: IConfigurationResponse,
    ): Promise<IConfigurationResponse> {
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

    async getAllConfiguration(limit: number, offset: number): Promise<IGetConfigurationResponse> {
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

    async getAllCpus(): Promise<ICpuResponse[]> {
        return this.prisma.cpu.findMany();
    }

    async getAllGpus(): Promise<IGpuResponse[]> {
        return this.prisma.gpu.findMany();
    }

    async getAllMotherBoards(): Promise<IMotherBoardResponse[]> {
        return this.prisma.motherboard.findMany();
    }

    async getAllPsus(): Promise<IPsuResponse[]> {
        return this.prisma.psu.findMany();
    }

    async getAllRam(): Promise<IRamResponse[]> {
        return this.prisma.ram.findMany();
    }
}
