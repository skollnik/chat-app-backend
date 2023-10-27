import { Module } from '@nestjs/common';
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { PrismaModule } from 'prisma/prisma.module';
import { CHAT_REPOSITORY } from './chat.constants';
import { ChatRepository } from './repositories/chat.repository';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';

const providers: Provider[] = [
  {
    provide: CHAT_REPOSITORY,
    useClass: ChatRepository,
  },
  ChatService,
];

@Module({
  imports: [PrismaModule],
  controllers: [ChatController],
  providers: [...providers],
  exports: [CHAT_REPOSITORY],
})
export class ChatModule {}
