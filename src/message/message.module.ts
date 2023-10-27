import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { MESSAGE_REPOSITORY } from './message.constants';
import { MessageRepository } from './repositories/message.repository';
import { MessageService } from './message.service';
import { PrismaModule } from 'prisma/prisma.module';
import { MessageController } from './message.controller';
import { AuthModule } from 'src/auth/auth.module';

const providers: Provider[] = [
  {
    provide: MESSAGE_REPOSITORY,
    useClass: MessageRepository,
  },
  MessageService,
];

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [MessageController],
  providers: [...providers],
  exports: [MESSAGE_REPOSITORY],
})
export class MessageModule {}
