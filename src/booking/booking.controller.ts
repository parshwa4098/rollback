import {
  Controller,
  Post,
  Body,
  HttpStatus,
  ConflictException,
} from '@nestjs/common';
import { BookingService } from './booking.service';

@Controller('bookings')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post()
  async bookSeat(@Body() bookingDto: { userId: number; seatId: number }) {
    try {
      const booking = await this.bookingService.bookSeat(
        bookingDto.userId,
        bookingDto.seatId,
      );

      return {
        success: true,
        booking,
        message: 'Seat booked successfully',
      };
    } catch (error: any) {
      if (error instanceof ConflictException) {
        return {
          success: false,
          message: error.message,
          statusCode: HttpStatus.CONFLICT,
        };
      }
      throw error;
    }
  }
}
