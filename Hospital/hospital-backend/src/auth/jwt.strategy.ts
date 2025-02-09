import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name); // ✅ Add Logger

  constructor(private readonly configService: ConfigService) {
    const secretKey = configService.get<string>('JWT_SECRET');

    if (!secretKey) {
      throw new Error("❌ JWT_SECRET is missing from environment variables!");
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secretKey, // ✅ Load from .env
    });

    this.logger.debug(`JWT Secret: ${secretKey}`); // ✅ Log secret for debugging
  }

  async validate(payload: any) {
    return { userId: payload.userId, email: payload.email };
  }
}
