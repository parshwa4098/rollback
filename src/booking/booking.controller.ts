import { Body, Controller, Post } from '@nestjs/common';

import { BookingService } from './booking.service';

@Controller('bookings')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @Post('book')
  async bookSeat(@Body() body: { userId: number; id: number }) {
    console.log(body.id);

    return this.bookingService.bookSeat(body.userId, body.id);
  }
}
