import { Module } from '@nestjs/common';
import { ProductController } from './products.controller';
import { ProductService } from './products.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Orders } from 'src/orders/models/orders.model';

@Module({
  imports: [SequelizeModule.forFeature([Orders])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductsModule {}
