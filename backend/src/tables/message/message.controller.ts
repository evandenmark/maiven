import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async createMessage(
    @Body('content') content: string,
    @Body('senderId') senderId: number,
    @Body('receiverId') receiverId: number,
  ) {
    return this.messageService.createMessage(content, senderId, receiverId);
  }

  @Get('user/:userId')
  async getMessagesForUser(@Param('userId') userId: number) {
    return this.messageService.getMessagesForUser(userId);
  }
}