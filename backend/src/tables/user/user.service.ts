import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import axios from 'axios';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  // Find or create a user based on Auth0 ID
  async findOrCreateUser(auth0Id: string, email: string, name: string): Promise<User> {
    let user = await this.userRepository.findOne({ where: { auth0Id } });
    if (!user) {
      user = this.userRepository.create({ auth0Id, email, name });
      await this.userRepository.save(user);
    }
    return user;
  }

  // Find all users
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Delete a user by ID
  async deleteUser(userId: number): Promise<void> {
    await this.userRepository.delete({ id: userId }); // Adjust if using auth0Id

    // Call Auth0 Management API to delete the user
    // const managementApiToken = await this.getManagementApiToken();

    // const auth0Id = this.findAuth0IdByUserId(userId)

    // await axios.delete(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${auth0Id}`, {
    //   headers: {
    //     Authorization: `Bearer ${managementApiToken}`,
    //   },
    // });
  }

  // private async getManagementApiToken(): Promise<string> {
  //   const response = await axios.post(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
  //     client_id: process.env.AUTH0_CLIENT_ID,
  //     client_secret: process.env.AUTH0_ClIENT_SECRET,
  //     audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
  //     grant_type: 'client_credentials',
  //   });

  //   return response.data.access_token;
  // }

  // get an auth0 id from a user in the db
  async findAuth0IdByUserId(userId: number): Promise<string | null> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    return user ? user.auth0Id : null; 
  }

  // and get a user from just the auth0 id
  async findUserByAuth0Id(auth0Id: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { auth0Id } });
  }

  // Get all users
  async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}