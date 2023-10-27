import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { NewMessageDto } from './dtos/new-message.dto';
import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  newMessage(@Body() { text, timestamp, chatId, userId }: NewMessageDto) {
    return this.messageService.newMessage(text, timestamp, chatId, userId);
  }

  @Get(':chatId')
  getAllMessagesByChatId(@Param('chatId', ParseIntPipe) chatId: number) {
    return this.messageService.getAllMessagesByChatId(chatId);
  }
}
