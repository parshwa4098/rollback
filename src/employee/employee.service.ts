/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/sequelize';
import { Records } from './model/employee.model';
import { UpdateBalanceDto } from './dto/employee.dto';
import { TransferBalanceDto } from './dto/transfer.dto';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Records) private recordsModel: typeof Records,
    @InjectConnection() private readonly sequelize: Sequelize,
  ) {}

  async updateBalance(dto: UpdateBalanceDto, id: number) {
    const currentRecord = await this.recordsModel.findByPk(id);

    if (!currentRecord) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    const newBalance = currentRecord.balance + dto.amount;

    if (newBalance < 0) {
      throw new BadRequestException(
        `Insufficient balance. Current balance: ${currentRecord.balance}, Requested amount: ${dto.amount}. Cannot go negative.`,
      );
    }

    const [affectedRows] = await this.recordsModel.update(
      {
        balance: newBalance,
        amount: dto.amount,
      },
      {
        where: { id },
      },
    );

    if (affectedRows === 0) {
      throw new BadRequestException('Failed to update balance');
    }

    return {
      success: true,
      employeeId: id,
      name: currentRecord.name,
      previousBalance: currentRecord.balance,
      amountAdded: dto.amount,
      newBalance: newBalance,
      message: dto.amount > 0 ? 'Balance increased' : 'Balance decreased',
    };
  }

  async transferBalance(dto: TransferBalanceDto) {
    const transaction = await this.sequelize.transaction();

    try {
      const fromUser = await this.recordsModel.findByPk(dto.fromUserId, {
        transaction,
        lock: true,
      });

      const toUser = await this.recordsModel.findByPk(dto.toUserId, {
        transaction,
        lock: true,
      });

      if (!fromUser) {
        await transaction.rollback();
        throw new NotFoundException(
          `Sender with ID ${dto.fromUserId} not found`,
        );
      }

      if (!toUser) {
        await transaction.rollback();
        throw new NotFoundException(
          `Receiver with ID ${dto.toUserId} not found`,
        );
      }

      if (dto.fromUserId === dto.toUserId) {
        await transaction.rollback();
        throw new BadRequestException('Cannot transfer to yourself');
      }

      if (fromUser.balance < dto.amount) {
        await transaction.rollback();
        throw new BadRequestException(
          `Insufficient balance. Available: ${fromUser.balance}, Required: ${dto.amount}`,
        );
      }

      const newSenderBalance = fromUser.balance - dto.amount;

      if (newSenderBalance < 0) {
        await transaction.rollback();
        throw new BadRequestException(
          `Transfer would result in negative balance. Current: ${fromUser.balance}, Transfer: ${dto.amount}`,
        );
      }

      const newReceiverBalance = toUser.balance + dto.amount;

      const [senderUpdated] = await this.recordsModel.update(
        {
          balance: newSenderBalance,
          amount: -dto.amount,
        },
        {
          where: { id: dto.fromUserId },
          transaction,
        },
      );

      const [receiverUpdated] = await this.recordsModel.update(
        {
          balance: newReceiverBalance,
          amount: dto.amount,
        },
        {
          where: { id: dto.toUserId },
          transaction,
        },
      );

      if (senderUpdated === 0 || receiverUpdated === 0) {
        await transaction.rollback();
        throw new BadRequestException(
          'Transfer failed - could not update balances',
        );
      }

      await transaction.commit();

      return {
        success: true,
        message: 'Transfer completed successfully',
        transfer: {
          from: {
            id: dto.fromUserId,
            name: fromUser.name,
            previousBalance: fromUser.balance,
            newBalance: newSenderBalance,
            amountDeducted: dto.amount,
          },
          to: {
            id: dto.toUserId,
            name: toUser.name,
            previousBalance: toUser.balance,
            newBalance: newReceiverBalance,
            amountReceived: dto.amount,
          },
          transferAmount: dto.amount,
        },
      };
    } catch (error: any) {
      await transaction.rollback();

      if (error.name === 'SequelizeValidationError') {
        throw new BadRequestException(
          'Transfer failed: Balance cannot be negative',
        );
      }

      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      throw new BadRequestException('Transfer failed due to unexpected error');
    }
  }
}
