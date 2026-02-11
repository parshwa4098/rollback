/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNumber, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateBalanceDto {
  @IsNumber({}, { message: 'Amount must be a number' })
  @IsNotEmpty({ message: 'Amount is required' })
  @Type(() => Number)
  declare amount: number;
}
