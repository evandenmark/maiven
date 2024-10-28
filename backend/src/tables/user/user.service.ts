import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Create a new user
  async createUser(username: string, email: string): Promise<User> {
    const user = this.userRepository.create({ username, email });
    return this.userRepository.save(user);
  }

  // Delete a user by ID
  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  // Get all users
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}