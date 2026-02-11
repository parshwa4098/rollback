// import { Module } from '@nestjs/common';
// import { AuthoController } from './autho.controller';
// import { AuthoService } from './autho.service';
// import { SequelizeModule } from '@nestjs/sequelize';
// import { Users } from 'src/auth/models/records.model';
// import { JwtModule } from '@nestjs/jwt';
// @Module({
//   imports: [
//     SequelizeModule.forFeature([Users]),
//     JwtModule.register({
//       secret: '123',
//       signOptions: {
//         expiresIn: '1h',
//       },
//     }),
//   ],
//   controllers: [AuthoController],
//   providers: [AuthoService],
// })
// export class AuthoModule {}
