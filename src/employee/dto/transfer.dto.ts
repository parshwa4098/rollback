/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNumber, IsNotEmpty, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class TransferBalanceDto {
  @IsNumber({}, { message: 'From user ID must be a number' })
  @IsNotEmpty({ message: 'From user ID is required' })
  @Type(() => Number)
  declare fromUserId: number;

  @IsNumber({}, { message: 'To user ID must be a number' })
  @IsNotEmpty({ message: 'To user ID is required' })
  @Type(() => Number)
  declare toUserId: number;

  @IsNumber({}, { message: 'Amount must be a number' })
  @IsPositive({ message: 'Amount must be positive' })
  @Type(() => Number)
  declare amount: number;
}
