/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Seat } from './model/seats.model';
import { Booking } from './model/booking.model';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'sequelize';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Seat) private seatModel: typeof Seat,
    @InjectModel(Booking) private bookingModel: typeof Booking,
    private sequelize: Sequelize,
  ) {}

  async bookSeat(userId: number, seatId: number): Promise<Booking> {
    const transaction = await this.sequelize.transaction({
      isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED,
    });

    try {
      const seat = await this.seatModel.findByPk(seatId, {
        lock: Transaction.LOCK.UPDATE,
        transaction,
      });

      if (!seat) {
        throw new ConflictException('Seat not found');
      }

      if (!seat.is_available) {
        throw new ConflictException('Seat already booked');
      }

      const existingBooking = await this.bookingModel.findOne({
        where: {
          seat_id: seatId,
          status: 'confirmed',
        },
        transaction,
      });

      if (existingBooking) {
        throw new ConflictException('Seat already booked');
      }

      const booking = await this.bookingModel.create(
        {
          user_id: userId,
          seat_id: seatId,
          status: 'confirmed',
        },
        { transaction },
      );

      await seat.update({ is_available: false }, { transaction });

      await transaction.commit();
      return booking;
    } catch (error: any) {
      await transaction.rollback();

      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ConflictException('Seat already booked by another user');
      }

      throw error;
    }
  }
}
