import {
    Controller,
    Post,
    Body,
    HttpStatus,
    SerializeOptions,
    UseGuards,
    Req,
    Patch,
    Get,
    Query,
} from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { ApiResponse } from '@nestjs/swagger';
import { CreateOrderRequest } from '../domain/dto/create.order.request';
import { AuthRestGuard } from '../../../guards/auth-rest.guard';
import { OrderResponse } from '../domain/dto/order.response';
import { Request } from 'express';
import { UpdateOrderRequest } from '../domain/dto/update.order.request';
import { ERole } from '../../user/domain/models/role.enum';
import { Roles } from '../../../decorators/roles.decorator';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Get()
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'get order',
        type: OrderResponse,
    })
    @SerializeOptions({
        strategy: 'exposeAll',
        type: OrderResponse,
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    })
    @UseGuards(AuthRestGuard)
    async getOrder(@Req() req: Request, @Query('id') id: number) {
        return await this.orderService.getOrder(+id, req['data'].userId);
    }

    @Post()
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'create order',
        type: OrderResponse,
    })
    @SerializeOptions({
        strategy: 'exposeAll',
        type: OrderResponse,
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    })
    @UseGuards(AuthRestGuard)
    async createOrder(@Req() req: Request, @Body() createOrderRequest: CreateOrderRequest) {
        return await this.orderService.createOrder(createOrderRequest, req['data'].userId);
    }

    @Patch()
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'update order',
        type: OrderResponse,
    })
    @SerializeOptions({
        strategy: 'exposeAll',
        type: OrderResponse,
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    })
    @UseGuards(AuthRestGuard)
    @Roles(ERole.Admin)
    async updateOrder(@Body() updateOrderRequest: UpdateOrderRequest) {
        return await this.orderService.updateOrder(updateOrderRequest);
    }
}
