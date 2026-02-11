/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
// import { UsersService } from './users.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}
  @Get()
  async findAllUsers(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('status') status: string,
  ) {
    const orders = await this.orderService.getOrders(page, limit, status);
    return orders;
  }
}
