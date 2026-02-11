// /* eslint-disable @typescript-eslint/no-misused-promises */
// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import {
//   BadRequestException,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { InjectModel } from '@nestjs/sequelize';
// import { Users } from 'src/auth/models/records.model';
// import { SignUpDto } from './dto/signupDto';
// import * as bcrypt from 'bcrypt';
// import { LoginDto } from './dto/loginDto';
// import { JwtService } from '@nestjs/jwt';
// @Injectable()
// export class AuthoService {
//   constructor(
//     @InjectModel(Users) private usersModel: typeof Users,
//     private jwtService: JwtService,
//   ) {}
//   async signUp(signupDto: SignUpDto) {
//     const { username, email, password } = signupDto;
//     if (!username || !email || password) {
//       throw new BadRequestException('all fields are required');
//     }
//     const hash = await bcrypt.hash(signupDto.password, 10);
//     const users = this.usersModel.create({
//       ...signupDto,
//       password: hash,
//     });
//     return {
//       users,
//     };
//   }
//   async login(loginDto: LoginDto) {
//     const { email, password } = loginDto;
//     if (!email || !password) {
//       throw new BadRequestException('both fields are required');
//     }
//     const user = await this.usersModel.findOne({
//       where: { email: loginDto.email },
//     });
//     if (!user) {
//       throw new UnauthorizedException('invalid credentials');
//     }
//     const passwordMatch = bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       throw new UnauthorizedException('invalid credentials');
//     }
//     const payload = {
//       id: user.id,
//       username: user.username,
//     };
//     const token = this.jwtService.sign(payload);
// //     return {
// //       token,
// //     };
// //   }
// // }
// import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/sequelize';
// import { Records } from './model/employee.model';
// import { UpdateBalanceDto } from './dto/update-balance.dto';
// import { TransferBalanceDto } from './dto/transfer-balance.dto';

// @Injectable()
// export class EmployeeService {
//   constructor(@InjectModel(Records) private recordsModel: typeof Records) {}

//   async updateBalance(dto: UpdateBalanceDto, id: number) {
//     const currentRecord = await this.recordsModel.findByPk(id);
    
//     if (!currentRecord) {
//       throw new NotFoundException(`Employee with ID ${id} not found`);
//     }

//     const newBalance = currentRecord.balance + dto.amount;

//     // Prevent negative balance - STRICT CHECK
//     if (newBalance < 0) {
//       throw new BadRequestException(
//         `Insufficient balance. Current balance: ${currentRecord.balance}, Requested amount: ${dto.amount}. Cannot go negative.`
//       );
//     }

//     const [affectedRows] = await this.recordsModel.update(
//       {
//         balance: newBalance,
//         amount: dto.amount,
//       },
//       {
//         where: { id }
//       }
//     );

//     if (affectedRows === 0) {
//       throw new BadRequestException('Failed to update balance');
//     }

//     return {
//       success: true,
//       employeeId: id,
//       name: currentRecord.name,
//       previousBalance: currentRecord.balance,
//       amountAdded: dto.amount,
//       newBalance: newBalance,
//       message: dto.amount > 0 ? 'Balance increased' : 'Balance decreased'
//     };
//   }

//   async transferBalance(dto: TransferBalanceDto) {
//     // Validate users exist
//     const fromUser = await this.recordsModel.findByPk(dto.fromUserId);
//     const toUser = await this.recordsModel.findByPk(dto.toUserId);

//     if (!fromUser) {
//       throw new NotFoundException(`Sender with ID ${dto.fromUserId} not found`);
//     }

//     if (!toUser) {
//       throw new NotFoundException(`Receiver with ID ${dto.toUserId} not found`);
//     }

//     // Prevent self-transfer
//     if (dto.fromUserId === dto.toUserId) {
//       throw new BadRequestException('Cannot transfer to yourself');
//     }

//     // STRICT BALANCE CHECK - prevent negative balance
//     if (fromUser.balance < dto.amount) {
//       throw new BadRequestException(
//         `Insufficient balance. Available: ${fromUser.balance}, Required: ${dto.amount}`
//       );
//     }

//     const newSenderBalance = fromUser.balance - dto.amount;
    
//     // Double check - ensure sender balance won't go negative
//     if (newSenderBalance < 0) {
//       throw new BadRequestException(
//         `Transfer would result in negative balance. Current: ${fromUser.balance}, Transfer: ${dto.amount}`
//       );
//     }

//     const newReceiverBalance = toUser.balance + dto.amount;

//     try {
//       // Update sender (deduct money)
//       const [senderUpdated] = await this.recordsModel.update(
//         {
//           balance: newSenderBalance,
//           amount: -dto.amount,
//         },
//         {
//           where: { id: dto.fromUserId }
//         }
//       );

//       // Update receiver (add money)
//       const [receiverUpdated] = await this.recordsModel.update(
//         {
//           balance: newReceiverBalance,
//           amount: dto.amount,
//         },
//         {
//           where: { id: dto.toUserId }
//         }
//       );

//       if (senderUpdated === 0 || receiverUpdated === 0) {
//         throw new BadRequestException('Transfer failed - could not update balances');
//       }

//       return {
//         success: true,
//         message: 'Transfer completed successfully',
//         transfer: {
//           from: {
//             id: dto.fromUserId,
//             name: fromUser.name,
//             previousBalance: fromUser.balance,
//             newBalance: newSenderBalance,
//             amountDeducted: dto.amount
//           },
//           to: {
//             id: dto.toUserId,
//             name: toUser.name,
//             previousBalance: toUser.balance,
//             newBalance: newReceiverBalance,
//             amountReceived: dto.amount
//           },
//           transferAmount: dto.amount
//         }
//       };

//     } catch (error) {
//       if (error.name === 'SequelizeValidationError') {
//         throw new BadRequestException('Transfer failed: Balance cannot be negative');
//       }
//       throw error;
//     }
//   }
// }