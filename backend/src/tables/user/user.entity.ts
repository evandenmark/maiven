import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Message } from '../message/message.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  // Relation with sent messages
  @OneToMany(() => Message, (message) => message.sender)
  sentMessages: Message[];

  // Relation with received messages
  @OneToMany(() => Message, (message) => message.receiver)
  receivedMessages: Message[];

}