import { Module } from '@nestjs/common';
// import { UsersController } from './users.controller';
// import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Orders } from './models/orders.model';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [SequelizeModule.forFeature([Orders])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
