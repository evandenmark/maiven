import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
  ) {}

  async createMessage(content: string, senderId: number, receiverId: number): Promise<Message> {
    const message = this.messageRepository.create({ content, sender: { id: senderId }, receiver: { id: receiverId } });
    return this.messageRepository.save(message);
  }

  async getMessagesForUser(userId: number): Promise<Message[]> {
    return this.messageRepository.find({
      where: [{ sender: { id: userId } }, { receiver: { id: userId } }],
      relations: ['sender', 'receiver'],
      order: { timestamp: 'DESC' },
    });
  }

  async getAllMessages(): Promise<Message[]> {

    const m = await this.messageRepository.find({
      relations: ['sender', 'receiver']
    });
    console.log(m)
    return m
    // return this.messageRepository.find();
  }
}