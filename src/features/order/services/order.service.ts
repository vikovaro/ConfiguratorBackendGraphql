import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateOrderRequest } from '../domain/dto/create.order.request';
import { OrderRepository } from '../repositories/order.repository';
import { IOrderResponse } from '../domain/dto/order.response';
import { UpdateOrderRequest } from '../domain/dto/update.order.request';
import { UserRepository } from '../../user/repositories/user.repository';
import { ERole } from '../../user/domain/models/role.enum';
import { MetricsService } from '../../../metrics/metrics.service';

@Injectable()
export class OrderService {
    constructor(
        private readonly orderRepository: OrderRepository,
        private readonly userRepository: UserRepository,
        private readonly metricsService: MetricsService,
    ) {}

    async getOrder(id: number, userId: string) {
        const order = await this.orderRepository.getOrder(id);
        const user = await this.userRepository.getUserById(userId);

        if (user.role !== ERole.Admin && order.user.id !== userId) {
            throw new UnauthorizedException();
        }

        return order;
    }

    async createOrder(
        createOrderRequest: CreateOrderRequest,
        userId: string,
    ): Promise<IOrderResponse> {
        await this.metricsService.incOrdersCount();
        return await this.orderRepository.createOrder(createOrderRequest, userId);
    }

    async updateOrder(updateOrderRequest: UpdateOrderRequest): Promise<IOrderResponse> {
        return await this.orderRepository.updateOrder(updateOrderRequest);
    }
}
