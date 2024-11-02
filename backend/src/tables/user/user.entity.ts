import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Message } from '../message/message.entity';

@Entity('user')  // Explicitly name the table 'user'
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // intentionally, the auth0id is not the primary key, although it will be unique
  // we need to store this so we can effectively communicate back and forth to auth0
  @Column({ unique: true })
  auth0Id: string;

  @Column()
  email: string;

  // if a user logs in via Social on Auth0, it will show their name. 
  // if a name doesn't exist, it defaults to the email
  @Column()
  name: string

  // I don't use the below, but I made them just in case, making it easier to get sender/receiver messages
  // Relation with sent messages
  @OneToMany(() => Message, (message) => message.sender)
  sentMessages: Message[];

  // Relation with received messages
  @OneToMany(() => Message, (message) => message.receiver)
  receivedMessages: Message[];

}