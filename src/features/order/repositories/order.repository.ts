import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient, Status } from '@prisma/client';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { CreateOrderRequest } from '../domain/dto/create.order.request';
import { IOrderResponse } from '../domain/dto/order.response';
import { UpdateOrderRequest } from '../domain/dto/update.order.request';

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

    async getOrder(id: number): Promise<IOrderResponse> {
        return this.prisma.order.findUnique({
            where: {
                id: id,
            },
            include: {
                ...this.BASE_ORDER_INCLUDE,
            },
        });
    }

    async createOrder(
        createOrderRequest: CreateOrderRequest,
        userId: string,
    ): Promise<IOrderResponse> {
        return this.prisma.order.create({
            data: {
                userId: userId,
                configurationId: createOrderRequest.configurationId,
                status: Status.Pending,
                address: createOrderRequest.address,
            },
            include: {
                ...this.BASE_ORDER_INCLUDE,
            },
        });
    }

    async updateOrder(updateOrderRequest: UpdateOrderRequest): Promise<IOrderResponse> {
        return this.prisma.order.update({
            where: {
                id: updateOrderRequest.orderId,
            },
            data: {
                status: updateOrderRequest.status ? updateOrderRequest.status : undefined,
                address: updateOrderRequest.address ? updateOrderRequest.address : undefined,
                userId: updateOrderRequest.userId ? updateOrderRequest.userId : undefined,
                deliveryDate: updateOrderRequest.deliveryDate
                    ? updateOrderRequest.deliveryDate
                    : undefined,
            },
            include: {
                ...this.BASE_ORDER_INCLUDE,
            },
        });
    }
}
