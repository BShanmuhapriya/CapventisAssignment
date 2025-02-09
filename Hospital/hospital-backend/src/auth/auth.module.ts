import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const secret = configService.get<string>('JWT_SECRET');
        if (!secret) {
          throw new Error('❌ JWT_SECRET is missing from environment variables!');
        }
        return {
          secret, 
          signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '3600s' },
        };
      },
    }),
  ],
  providers: [
    AuthService,
    AuthResolver,
    JwtStrategy
  ],
  exports: [AuthService],
})
export class AuthModule {}
