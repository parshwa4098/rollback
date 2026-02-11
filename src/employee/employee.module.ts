import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Records } from './model/employee.model';

@Module({
  imports: [SequelizeModule.forFeature([Records])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
