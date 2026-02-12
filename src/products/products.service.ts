/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Orders } from 'src/orders/models/orders.model';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Orders) private ordersModel: typeof Orders) {}
  async getProducts(page: number, limit: number, status: string) {
    const pages = Number(page || 1);

    const limits = Number(limit || 10);

    const offset = Number((pages - 1) * limits);
    if (status && !['paid', 'unpaid'].includes(status)) {
      throw new BadRequestException('status must be unpaid or paid');
    }
    // console.log('pages::', typeof pages);
    // console.log('limits::', typeof limits);
    // console.log('offset::', typeof offset);
    const products = await this.ordersModel.findAndCountAll({
      limit: Number(limits),
      offset: Number(offset),
    });

    if (!products) {
      throw new NotFoundException('orders not found');
    }
    return products;
  }
}
