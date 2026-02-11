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
      models: [Orders, Records],
      autoLoadModels: true,
      synchronize: true,
    }),

    OrdersModule,

    EmployeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
