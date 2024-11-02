import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Message {
  // Defines a message

  // each row in the table represents a message and has a unique id 
  @PrimaryGeneratedColumn()
  id: number;

  // the content is the message itself 
  @Column()
  content: string;

  // the timestamp is when the data was sent 
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  // Set up a Many-to-One relationship with the User entity for sender
  // Here the sender and receiver are foreign keys into the user table
  // note the CASCADE: when a user is deleted, it will delete this message too
  // via the CASCADE propagation 
  @ManyToOne(() => User, (user) => user.sentMessages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sender_id' })
  sender: User;

  @ManyToOne(() => User, (user) => user.receivedMessages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'receiver_id' })
  receiver: User;
}