import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ResponseModule } from './response/response.module';
// import { UsersModule } from './users/users.module';

import { SequelizeModule } from '@nestjs/sequelize';
// import { User } from './users/models/users.model';
// import { EmployeeModule } from './employee/employee.module';
// import { AuthModule } from './auth/auth.module';
// import { Users } from './auth/models/records.model';
// import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { Orders } from './orders/models/orders.model';
// import { AuthoModule } from './autho/autho.module';
import { Records } from './employee/model/employee.model';
import { EmployeeModule } from './employee/employee.module';
import { ProductsModule } from './products/products.module';
import { Users } from './autho/models/users.model';
import { AuthoModule } from './autho/autho.module';
import { Booking } from './booking/model/booking.model';
import { BookingModule } from './booking/booking.module';
import { Seat } from './booking/model/seats.model';
// import { Customers } from './booking/model/users.model';
// import { WalletModule } from './wallet/wallet.module';
// import { Records } from './wallet/models/records.model';
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'parshwa@10',
      database: 'angel',
      models: [Orders, Records, Users, Booking, Seat],
      autoLoadModels: true,
      synchronize: true,
    }),

    OrdersModule,
    ProductsModule,
    AuthoModule,
    EmployeeModule,
    BookingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
