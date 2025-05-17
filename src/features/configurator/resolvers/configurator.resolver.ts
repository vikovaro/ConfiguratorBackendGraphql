import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGraphqlGuard } from '../../../guards/auth-grapql.guard';
import { ConfiguratorService } from '../services/configurator.service';
import { UseGuards } from '@nestjs/common';
import { ConfigurationEntity, ConfigurationsEntity } from '../domain/entities/configuration.entity';
import { GraphqlReq } from '../../../decorators/graphql-req.decorator';
import { GetConfigurationsInput } from '../domain/dto/get-configurations.input';
import { GetConfigurationInput } from '../domain/dto/get-configuration.input';
import { CreateConfigurationInput } from '../domain/dto/create-configuration.input';

@Resolver()
@UseGuards(AuthGraphqlGuard)
export class ConfiguratorResolver {
    constructor(private readonly configuratorService: ConfiguratorService) {}

    @Mutation(() => ConfigurationEntity, { name: 'createConfiguration' })
    @UseGuards(AuthGraphqlGuard)
    async createConfiguration(
        @GraphqlReq() req: Request,
        @Args('createConfiguration') createConfigurationInput: CreateConfigurationInput,
    ) {
        return await this.configuratorService.createConfiguration(createConfigurationInput);
    }

    @Query(() => ConfigurationEntity, { name: 'getConfiguration' })
    @UseGuards(AuthGraphqlGuard)
    async getConfiguration(
        @GraphqlReq() req: Request,
        @Args('getConfiguration') getConfigurationInput: GetConfigurationInput,
    ) {
        return await this.configuratorService.getConfigurationById(getConfigurationInput.id);
    }

    @Query(() => ConfigurationsEntity, { name: 'getConfigurations' })
    @UseGuards(AuthGraphqlGuard)
    async getConfigurations(
        @GraphqlReq() req: Request,
        @Args('getConfigurations') getConfigurationsInput: GetConfigurationsInput,
    ) {
        return await this.configuratorService.getAllConfigurations(
            getConfigurationsInput.limit,
            getConfigurationsInput.offset,
        );
    }
}
