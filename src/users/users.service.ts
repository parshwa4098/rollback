// /* eslint-disable @typescript-eslint/no-misused-promises */
// /* eslint-disable no-unused-labels */
// /* eslint-disable @typescript-eslint/no-unused-expressions */
// /* eslint-disable @typescript-eslint/no-unsafe-assignment */
// /* eslint-disable @typescript-eslint/require-await */
// /* eslint-disable @typescript-eslint/no-unsafe-return */
// /* eslint-disable @typescript-eslint/no-unsafe-call */
// import { Injectable, NotFoundException } from '@nestjs/common';
// // import { InjectModel } from '@nestjs/sequelize';
// import { Users } from 'src/auth/models/users.model';

// @Injectable()
// export class UsersService {
//   constructor( private userModel: typeof Users) {}
//   async getAllUsers(): Promise<Users[]> {
//     const users = this.userModel.findAll();
//     // const filteredUsers = (await users).filter((user) => !user.isDeleted);
//     // return filteredUsers;
//   }

//   async delete(id: number) {
//     const user = await this.userModel.findOne({
//       where: { id },
//     });
//     if (!user) {
//       throw new NotFoundException('user not found');
//     }

//     const updatedField = await user.update({
//       isDeleted: true,
//     });
//     if (updatedField) {
//       throw new NotFoundException('user delted already');
//     }

//     return { message: 'is deleted success', updatedField };
//   }
// }
