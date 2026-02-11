/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable no-unused-labels */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Orders } from './models/orders.model';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Orders) private orderModel: typeof Orders) {}

  async getOrders(page: number = 1, limit: number = 10, status: string) {
    const pages = Number(page);
    const limits = Number(limit) || 10;
    const offset = (pages - 1) * limits;

    const orders = await this.orderModel.findAndCountAll({
      where: { status: status === 'paid' ? 'paid' : 'unpaid' },
      limit: limits,
      offset: offset,
    });

    if (!orders) {
      throw new NotFoundException('Orders not found');
    }

    return orders;
  }
}
