import { Injectable, UnauthorizedException } from '@nestjs/common';
import { OrderRepository } from '../repositories/order.repository';
import { UserRepository } from '../../user/repositories/user.repository';
import { ERole } from '../../user/domain/enums/role.enum';
import { MetricsService } from '../../../metrics/metrics.service';
import { CreateOrderInput } from '../domain/dto/create-order.input';
import { IOrder } from '../domain/entities/order.entity';
import { UpdateOrderInput } from '../domain/dto/update-order.input';

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

    async createOrder(createOrderInput: CreateOrderInput, userId: string): Promise<IOrder> {
        await this.metricsService.incOrdersCount();
        return await this.orderRepository.createOrder(createOrderInput, userId);
    }

    async updateOrder(updateOrderInput: UpdateOrderInput): Promise<IOrder> {
        return await this.orderRepository.updateOrder(updateOrderInput);
    }
}
