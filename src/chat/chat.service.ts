import { Inject, Injectable } from '@nestjs/common';
import { CHAT_REPOSITORY } from './chat.constants';
import { IChatRepository } from './interfaces/chat-repository.interface';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class ChatService {
  constructor(
    @Inject(CHAT_REPOSITORY) private readonly chatRepository: IChatRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async getAllChats(): Promise<any> {
    const chats = await this.chatRepository.getAllChats();
    return chats;
  }

  async newChat(name: string): Promise<any> {
    const chat = await this.chatRepository.create(name);
    this.eventEmitter.emit('chat.created');
    return chat;
  }
}
