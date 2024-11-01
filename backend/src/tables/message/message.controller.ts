import { Controller, Post, Get, Param, Body, Query } from '@nestjs/common';
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

  // Get messages for all users or a specific user
  @Get()
  async getMessages(@Query('userId') userId?: number) {
    if (userId) {
      return this.messageService.getMessagesForUser(userId);
    } else {
      return this.messageService.getAllMessages();
    }
  }
}