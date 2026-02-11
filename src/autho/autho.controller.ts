// /* eslint-disable @typescript-eslint/no-unsafe-argument */
// import { Body, Controller, Post } from '@nestjs/common';
// import { AuthoService } from './autho.service';

// @Controller('autho')
// export class AuthoController {
//   constructor(private authoService: AuthoService) {}
//   @Post('signup')
//   async signUp(@Body() body: any) {
//     const users = this.authoService.signUp(body);
//     return users;
//   }
//   @Post('login')
//   async login(@Body() body: any) {
//     const users = this.authoService.login(body);
//     return users;
//   }
// }
