import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Booking } from './model/booking.model';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { Seat } from './model/seats.model';

@Module({
  imports: [SequelizeModule.forFeature([Booking, Seat])],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
