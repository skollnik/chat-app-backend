import { Inject } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { OnEvent } from '@nestjs/event-emitter';
import { Socket, Server } from 'socket.io';
import { USER_REPOSITORY } from 'src/auth/auth.constants';
import { IUserRepository } from 'src/auth/interfaces/user-repository.interface';
import { SocketWithUser } from './socket-with-user.type';
import { IMessageInterface } from 'src/message/interfaces/message.interface';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export default class MessageGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private server: Server;
  private connections: Map<number, Socket> = new Map();

  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
  ) {}

  async handleConnection(client: SocketWithUser, ...args: any[]) {
    const userId = client.userId;
    const user = await this.userRepository.findById(userId);
    if (!user) {
      client.disconnect();
    }
    this.connections.set(userId, client);
  }

  handleDisconnect(client: SocketWithUser) {
    const userId = client.userId;
    this.connections.delete(userId);
  }

  afterInit(): void {}

  @OnEvent('chat.created')
  handleChatCreated() {
    this.server.emit('chatCreated', {});
  }

  @OnEvent('new.message')
  handleNewMessage({ message, user }: IMessageInterface) {
    const { email, password, ...rest } = user;
    this.connections.forEach((socket: Socket) => {
      socket.emit('newMessage', {
        chatId: message.chatId,
        text: message.text,
        timestamp: message.timestamp,
        user: rest,
      });
    });
  }
}
