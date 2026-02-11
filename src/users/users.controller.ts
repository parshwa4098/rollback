// /* eslint-disable @typescript-eslint/no-unsafe-argument */
// import {
//   Controller,
//   Delete,
//   Get,
//   NotFoundException,
//   Param,
// } from '@nestjs/common';
// import { UsersService } from './users.service';

// @Controller('users')
// export class UsersController {
//   constructor(private readonly userService: UsersService) {}
//   @Get()
//   async findAllUsers() {
//     const user = await this.userService.getAllUsers();
//     if (!user) {
//       throw new NotFoundException('users not found');
//     }
//     return user;
//   }

//   @Delete(':id')
//   async delete(@Param('id') id: number) {
//     const user = await this.userService.delete(id);

//     return user;
//   }
// }
