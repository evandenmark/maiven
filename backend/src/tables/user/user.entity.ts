import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Message } from '../message/message.entity';

@Entity('user')  // Explicitly name the table 'user'
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  auth0Id: string;

  @Column()
  email: string;

  @Column()
  name: string

  // Relation with sent messages
  @OneToMany(() => Message, (message) => message.sender)
  sentMessages: Message[];

  // Relation with received messages
  @OneToMany(() => Message, (message) => message.receiver)
  receivedMessages: Message[];

}