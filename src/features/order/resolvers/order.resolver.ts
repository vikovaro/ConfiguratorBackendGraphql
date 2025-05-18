import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { OrderService } from '../services/order.service';
import { AuthGraphqlGuard } from '../../../guards/auth-grapql.guard';
import { GraphqlReq } from '../../../decorators/graphql-req.decorator';
import { CreateOrderInput } from '../domain/dto/create-order.input';
import { UpdateOrderInput } from '../domain/dto/update-order.input';
import { Order } from '../domain/entities/order.entity';

@Resolver()
export class OrderResolver {
    constructor(private readonly orderService: OrderService) {}

    @Query(() => Order, { name: 'getOrder' })
    @UseGuards(AuthGraphqlGuard)
    async getOrder(@GraphqlReq() req: Request, @Args('orderId') orderId: number) {
        return await this.orderService.getOrder(orderId, req['data'].userId);
    }

    @Mutation(() => Order, { name: 'createOrder' })
    @UseGuards(AuthGraphqlGuard)
    async createOrder(
        @GraphqlReq() req: Request,
        @Args('createOrder') createOrderInput: CreateOrderInput,
    ) {
        return await this.orderService.createOrder(createOrderInput, req['data'].userId);
    }

    @Mutation(() => Order, { name: 'updateOrder' })
    @UseGuards(AuthGraphqlGuard)
    async updateOrder(
        @GraphqlReq() req: Request,
        @Args('updateOrder') updateOrderInput: UpdateOrderInput,
    ) {
        return await this.orderService.updateOrder(updateOrderInput);
    }
}
