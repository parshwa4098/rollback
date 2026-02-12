/* eslint-disable prettier/prettier */
import { Controller, Get, Query } from '@nestjs/common';
import { ProductService } from './products.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}
  @Get()
  async findAllProducts(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('status') status: string,
  ) {
    const pages = Number(page);
    const limits = Number(limit);
    const products = await this.productsService.getProducts(
      pages,
      limits,
      status,
    );
    return products;
  }
}
