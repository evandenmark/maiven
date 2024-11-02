import { Controller, Post, Get, Param, Body, Query } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  // the POST request called when a message is generated
  // this function is accessible by the frontend, but 
  // it calls messageService to actually manipulate the DB tables
  @Post()
  async createMessage(
    @Body('content') content: string,
    @Body('senderId') senderId: number,
    @Body('receiverId') receiverId: number,
  ) {
    return this.messageService.createMessage(content, senderId, receiverId);
  }

  // Get messages for all users or a specific user
  // Here user is optional: if one exists, get only the messages for that user
  // otherwise get them all
  @Get()
  async getMessages(@Query('userId') userId?: number) {
    if (userId) {
      return this.messageService.getMessagesForUser(userId);
    } else {
      return this.messageService.getAllMessages();
    }
  }
}