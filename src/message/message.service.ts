import { Inject, Injectable } from '@nestjs/common';
import { MESSAGE_REPOSITORY } from './message.constants';
import { IMessageRepository } from './interfaces/message-repository.interface';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { USER_REPOSITORY } from 'src/auth/auth.constants';
import { IUserRepository } from 'src/auth/interfaces/user-repository.interface';

@Injectable()
export class MessageService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    @Inject(MESSAGE_REPOSITORY)
    private readonly messageRepository: IMessageRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async newMessage(
    text: string,
    timestamp: Date,
    chatId: number,
    userId: number,
  ): Promise<any> {
    const message = await this.messageRepository.newMessage(
      text,
      timestamp,
      chatId,
      userId,
    );
    const user = await this.userRepository.findById(userId);
    if (!user) return;
    this.eventEmitter.emit('new.message', { message, user });
    return message;
  }

  async getAllMessagesByChatId(chatId: number) {
    const messages = await this.messageRepository.getAllMessagesByChatId(
      chatId,
    );
    return messages;
  }
}
