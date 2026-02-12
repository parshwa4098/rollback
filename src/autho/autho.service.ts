/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './models/users.model';
import { SignUpDto } from './dto/signupDto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/loginDto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthoService {
  constructor(
    @InjectModel(Users) private usersModel: typeof Users,
    private jwtService: JwtService,
  ) {}
  async signUp(signupDto: SignUpDto) {
    const { username, email, password } = signupDto;
    if (!username || !email || !password) {
      throw new BadRequestException('all fields are required');
    }
    const hash = await bcrypt.hash(signupDto.password, 10);
    const users = await this.usersModel.create({
      ...signupDto,
      password: hash,
    });
    return {
      users,
    };
  }
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    if (!email || !password) {
      throw new BadRequestException('both fields are required');
    }
    const user = await this.usersModel.findOne({
      where: { email: loginDto.email },
    });
    if (!user) {
      throw new UnauthorizedException('invalid credentials');
    }
    const passwordMatch = bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('invalid credentials');
    }
    const payload = {
      id: user.id,
      username: user.username,
    };
    const token = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: 'refresh_token',
      expiresIn: '2d',
    });
    return {
      token,
      refreshToken,
    };
  }
  async refreshToken(refreshToken: any) {
    const payload = await this.jwtService.verify(refreshToken, {
      secret: 'refresh_Token',
    });
    const newAccessToken = this.jwtService.sign(
      {
        id: payload.id,
        username: payload.username,
      },
      {
        secret: 'token',
        expiresIn: '1h',
      },
    );
    return {
      accessTokken: newAccessToken,
    };
  }
}
