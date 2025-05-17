import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfiguratorRepository } from '../repositories/configurator.repository';
import { CreateConfigurationRequest } from '../domain/dto/create-configuration.request';
import { IConfigurationResponse } from '../domain/dto/configuration.response';
import { IGetConfigurationResponse } from '../domain/dto/get-configurations.response';
import { ConfiguratorException } from '../../../errors/configurator-exception';

@Injectable()
export class ConfiguratorService {
    constructor(private readonly configurationRepository: ConfiguratorRepository) {}

    async createConfiguration(
        createConfigurationDto: CreateConfigurationRequest,
    ): Promise<IConfigurationResponse> {
        const userPrice = createConfigurationDto.price;

        const cpus = await this.configurationRepository.getAllCpus();
        const gpus = await this.configurationRepository.getAllGpus();
        const rams = await this.configurationRepository.getAllRam();
        const motherboards = await this.configurationRepository.getAllMotherBoards();
        const psus = await this.configurationRepository.getAllPsus();

        const sortedCpus = createConfigurationDto.cpu
            ? cpus.filter((cpu) => cpu.manufacturer === createConfigurationDto.cpu)
            : cpus;

        const sortedGpus = createConfigurationDto.gpu
            ? gpus.filter((gpu) => gpu.manufacturer === createConfigurationDto.gpu)
            : gpus;

        const sortedRams = createConfigurationDto.ram
            ? rams.filter((ram) => ram.capacity === createConfigurationDto.ram)
            : rams;

        if (
            motherboards.length === 0 ||
            psus.length === 0 ||
            sortedCpus.length === 0 ||
            sortedGpus.length === 0 ||
            sortedRams.length === 0
        ) {
            throw new ConfiguratorException(
                'Не удалось подобрать конфигурацию в рамках указанного бюджета.',
            );
        }

        const cpuBudget = userPrice * 0.3; // 30% на процессор
        const gpuBudget = userPrice * 0.4; // 40% на видеокарту
        const ramBudget = userPrice * 0.1; // 10% на оперативную память
        const motherboardBudget = userPrice * 0.1; // 10% на материнскую плату
        const psuBudget = userPrice * 0.1; // 10% на блок питания

        let bestConfiguration: IConfigurationResponse | null = null;
        let bestPriceDifference = Infinity;

        // Сортируем компоненты по цене (от дорогих к дешевым)
        sortedCpus.sort((a, b) => b.price - a.price);
        sortedGpus.sort((a, b) => b.price - a.price);
        sortedRams.sort((a, b) => b.price - a.price);
        motherboards.sort((a, b) => b.price - a.price);
        psus.sort((a, b) => b.price - a.price);

        //   const resultText = `
        // CPUs: ${JSON.stringify(sortedCpus)} \n
        // GPUs: ${JSON.stringify(sortedGpus)} \n
        // RAMs: ${JSON.stringify(sortedRams)} \n
        // Motherboards: ${JSON.stringify(motherboards)} \n
        // PSUs: ${JSON.stringify(psus)}`;

        // console.log(`test ${resultText}`);

        for (const cpu of sortedCpus) {
            if (cpu.price > cpuBudget) continue; // пропускаем процессоры, которые превышают свой бюджет

            for (const motherboard of motherboards) {
                if (motherboard.price > motherboardBudget) continue; // Пропускаем материнские платы, которые превышают свой бюджет
                if (motherboard.socket === cpu.socket) {
                    for (const gpu of sortedGpus) {
                        if (gpu.price > gpuBudget) continue; // Пропускам видеокарты которые превышают свой бюджет

                        for (const ram of sortedRams) {
                            if (ram.price > ramBudget) continue; // Пропускаем оперативную память которая превышает свой бюджет

                            const totalPower = cpu.wattage + gpu.wattage;
                            for (const psu of psus) {
                                if (psu.price > psuBudget) continue; // Пропускаем блоки питания, которые превышают свой бюджет
                                if (psu.wattage >= totalPower) {
                                    const totalPrice =
                                        cpu.price +
                                        motherboard.price +
                                        gpu.price +
                                        ram.price +
                                        psu.price;
                                    if (totalPrice <= userPrice) {
                                        const priceDifference = userPrice - totalPrice;
                                        if (priceDifference < bestPriceDifference) {
                                            bestPriceDifference = priceDifference;
                                            bestConfiguration = {
                                                id: 0,
                                                cpu,
                                                gpu,
                                                motherboard,
                                                psu,
                                                ram,
                                                price: totalPrice,
                                            };
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        if (!bestConfiguration) {
            throw new ConfiguratorException(
                'Не удалось подобрать конфигурацию в рамках указанного бюджета.',
            );
        }

        const savedConfiguration =
            await this.configurationRepository.saveConfiguration(bestConfiguration);

        return savedConfiguration;
    }

    async getConfigurationById(id: number) {
        let configuration: IConfigurationResponse;
        configuration = await this.configurationRepository.getConfigurationFromCache(id);
        if (!configuration) {
            configuration = await this.configurationRepository.getConfigurationFromDb(id);
        }

        if (!configuration) {
            throw new NotFoundException();
        }

        return configuration;
    }

    async getAllConfigurations(limit: number, offset: number): Promise<IGetConfigurationResponse> {
        return await this.configurationRepository.getAllConfiguration(limit, offset);
    }

    async createConfigurationOld1(
        createConfigurationDto: CreateConfigurationRequest,
    ): Promise<IConfigurationResponse> {
        const userPrice = createConfigurationDto.price;
        const maxPrice = userPrice + 3000;

        const cpus = await this.configurationRepository.getAllCpus();
        const gpus = await this.configurationRepository.getAllGpus();
        const rams = await this.configurationRepository.getAllRam();
        const motherboards = await this.configurationRepository.getAllMotherBoards();
        const psus = await this.configurationRepository.getAllPsus();

        const sortedCpus = createConfigurationDto.cpu
            ? cpus.filter((cpu) => cpu.manufacturer === createConfigurationDto.cpu)
            : cpus;

        const sortedGpus = createConfigurationDto.gpu
            ? gpus.filter((gpu) => gpu.manufacturer === createConfigurationDto.gpu)
            : gpus;

        const sortedRams = createConfigurationDto.ram
            ? rams.filter((ram) => ram.capacity === createConfigurationDto.ram)
            : rams;

        if (
            motherboards.length === 0 ||
            psus.length === 0 ||
            sortedCpus.length === 0 ||
            sortedGpus.length === 0 ||
            sortedRams.length === 0
        ) {
            throw new ConfiguratorException(
                'Не удалось подобрать конфигурацию в рамках указанного бюджета.',
            );
        }

        let bestConfiguration: IConfigurationResponse | null = null;
        let bestPriceDifference = Infinity;

        // Сортируем компоненты по цене (от дорогих к дешевым)
        sortedCpus.sort((a, b) => b.price - a.price);
        sortedGpus.sort((a, b) => b.price - a.price);
        sortedRams.sort((a, b) => b.price - a.price);
        motherboards.sort((a, b) => b.price - a.price);
        psus.sort((a, b) => b.price - a.price);

        for (const cpu of sortedCpus) {
            for (const motherboard of motherboards) {
                if (motherboard.socket === cpu.socket) {
                    for (const gpu of sortedGpus) {
                        for (const ram of sortedRams) {
                            const totalPower = cpu.wattage + gpu.wattage + ram.capacity; // Пример расчета мощности
                            for (const psu of psus) {
                                if (psu.wattage >= totalPower) {
                                    const totalPrice =
                                        cpu.price +
                                        motherboard.price +
                                        gpu.price +
                                        ram.price +
                                        psu.price;
                                    if (totalPrice <= maxPrice) {
                                        const priceDifference = maxPrice - totalPrice; // Насколько близко к бюджету
                                        if (priceDifference < bestPriceDifference) {
                                            bestPriceDifference = priceDifference;
                                            bestConfiguration = {
                                                id: 0, // Временное значение, будет заменено при сохранении в БД
                                                cpu,
                                                gpu,
                                                motherboard,
                                                psu,
                                                ram,
                                                price: totalPrice,
                                            };
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        if (!bestConfiguration) {
            throw new ConfiguratorException(
                'Не удалось подобрать конфигурацию в рамках указанного бюджета.',
            );
        }

        // Сохранение конфигурации в БД
        const savedConfiguration =
            await this.configurationRepository.saveConfiguration(bestConfiguration);

        return savedConfiguration;
    }
}
