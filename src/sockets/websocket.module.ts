import { Module } from '@nestjs/common';
import MessageGateway from './message.gateway';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [MessageGateway],
  imports: [ConfigModule, AuthModule],
})
export class WebSocketModule {}
