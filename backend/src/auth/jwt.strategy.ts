import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService
  ) {
      super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Ocekuje da token stigne u header-u "Authorization: "
          ignoreExpiration: false, // Proverava se da li je isteko
          secretOrKey: configService.get<string>('JWT_SECRET') || 'default',
      });
  }

  // async validate(payload: any) {
  //   return { userId: payload.sub, email: payload.email };
  // }

  async validate(payload: { sub: number; email: string }) {
    const user = await this.userService.findByEmailOrThrow(payload.email);
    const { password, ...safeUser } = user;
    return safeUser;
  }
}
