/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { UpdateBalanceDto } from './dto/employee.dto';
import { TransferBalanceDto } from './dto/transfer.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Patch(':id')
  async updateEmployeeBalance(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBalanceDto: UpdateBalanceDto,
  ) {
    return await this.employeeService.updateBalance(updateBalanceDto, id);
  }

  @Post('transfer')
  async transferBalance(@Body() transferBalanceDto: TransferBalanceDto) {
    return await this.employeeService.transferBalance(transferBalanceDto);
  }
}
