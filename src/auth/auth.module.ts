import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { AuthService } from './auth.service';
import {
  HASHING_SERVICE,
  JWT_EXPIRES_IN,
  JWT_SECRET,
  JWT_SERVICE,
  THREAD_SERVICE,
  USER_REPOSITORY,
} from './auth.constants';
import { UserRepository } from './repositories/user.repository';
import { HashingService } from './services/hashing.service';
import { JWTService } from './services/jwt.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt-strategy';
import { PrismaModule } from 'prisma/prisma.module';
import { UserWorkerService } from 'src/thread/thread.service';
import { PassportModule } from '@nestjs/passport';

const providers: Provider[] = [
  {
    provide: USER_REPOSITORY,
    useClass: UserRepository,
  },
  {
    provide: HASHING_SERVICE,
    useClass: HashingService,
  },
  {
    provide: JWT_SERVICE,
    useClass: JWTService,
  },
  {
    provide: THREAD_SERVICE,
    useClass: UserWorkerService,
  },
  AuthService,
  JwtStrategy,
];

@Module({
  imports: [
    PrismaModule,
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get(JWT_SECRET),
        signOptions: {
          expiresIn: configService.get(JWT_EXPIRES_IN),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [...providers],
  exports: [USER_REPOSITORY],
})
export class AuthModule {}
