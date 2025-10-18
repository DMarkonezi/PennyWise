import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    
    constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = parseInt(this.configService.get('BCRYPT_SALT') || '10', 10);
    return bcrypt.hash(password, saltRounds);
  }

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');

    const valid = await bcrypt.compare(pass, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const { password, ...result } = user;
    return result;
  }

  async register(data: { email: string; password: string; firstName: string; lastName: string }) {
    const existing = await this.userService.findByEmail(data.email);
    if (existing) throw new BadRequestException('Email already exists');

    const hashed = await this.hashPassword(data.password);
    const newUser = await this.userService.create({
      ...data,
      password: hashed,
    });

    return this.login(newUser);
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
