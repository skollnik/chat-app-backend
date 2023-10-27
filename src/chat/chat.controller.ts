import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { NewChatDto } from './dtos/new-chat.dto';
import { ChatService } from './chat.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(JwtGuard)
  @Get()
  getAllChats() {
    return this.chatService.getAllChats();
  }

  @UseGuards(JwtGuard)
  @Post()
  newChat(@Body() { name }: NewChatDto) {
    return this.chatService.newChat(name);
  }
}
