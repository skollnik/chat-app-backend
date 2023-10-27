import { Injectable } from '@nestjs/common';
import { IChatRepository } from '../interfaces/chat-repository.interface';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ChatRepository implements IChatRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllChats(): Promise<any> {
    const chatEntity = await this.prisma.chat.findMany({});
    return chatEntity;
  }

  async create(name: string): Promise<any> {
    const chatEntity = await this.prisma.chat.create({
      data: {
        name,
      },
    });
    return chatEntity;
  }
}
