import { Injectable } from '@nestjs/common';
import { IMessageRepository } from '../interfaces/message-repository.interface';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class MessageRepository implements IMessageRepository {
  constructor(private readonly prisma: PrismaService) {}

  async newMessage(
    text: string,
    timestamp: Date,
    chatId: number,
    userId: number,
  ): Promise<any> {
    const messageEntity = await this.prisma.message.create({
      data: {
        text,
        timestamp,
        chatId,
        userId,
      },
    });
    return messageEntity;
  }

  async getAllMessagesByChatId(chatId: number): Promise<any> {
    const messages = await this.prisma.message.findMany({
      where: {
        chatId,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    return messages;
  }
}
