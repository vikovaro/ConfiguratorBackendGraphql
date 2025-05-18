import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient, Status } from '@prisma/client';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { CreateOrderInput } from '../domain/dto/create-order.input';
import { IOrder } from '../domain/entities/order.entity';
import { UpdateOrderInput } from '../domain/dto/update-order.input';

@Injectable()
export class OrderRepository {
    constructor(
        private readonly prisma: PrismaClient,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    BASE_ORDER_INCLUDE = {
        user: {
            select: {
                id: true,
                email: true,
                username: true,
                role: true,
                name: true,
                phone: true,
                createdAt: true,
            },
        },
        configuration: {
            include: {
                cpu: true,
                gpu: true,
                motherboard: true,
                psu: true,
                ram: true,
            },
        },
    };

    async getOrder(id: number): Promise<IOrder> {
        return this.prisma.order.findUnique({
            where: {
                id: id,
            },
            include: {
                ...this.BASE_ORDER_INCLUDE,
            },
        });
    }

    async createOrder(createOrderInput: CreateOrderInput, userId: string): Promise<IOrder> {
        return this.prisma.order.create({
            data: {
                userId: userId,
                configurationId: createOrderInput.configurationId,
                status: Status.Pending,
                address: createOrderInput.address,
            },
            include: {
                ...this.BASE_ORDER_INCLUDE,
            },
        });
    }

    async updateOrder(updateOrderInput: UpdateOrderInput): Promise<IOrder> {
        return this.prisma.order.update({
            where: {
                id: updateOrderInput.orderId,
            },
            data: {
                status: updateOrderInput.status ? updateOrderInput.status : undefined,
                address: updateOrderInput.address ? updateOrderInput.address : undefined,
                userId: updateOrderInput.userId ? updateOrderInput.userId : undefined,
                deliveryDate: updateOrderInput.deliveryDate
                    ? updateOrderInput.deliveryDate
                    : undefined,
            },
            include: {
                ...this.BASE_ORDER_INCLUDE,
            },
        });
    }
}
