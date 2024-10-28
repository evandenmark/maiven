import { Controller, Post, Delete, Get, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // POST /users - Create a new user
  @Post()
  async createUser(
    @Body('username') username: string,
    @Body('email') email: string,
  ) {
    return this.userService.createUser(username, email);
  }

  // DELETE /users/:userId - Delete a user by ID
  @Delete(':userId')
  async deleteUser(@Param('userId') userId: number) {
    await this.userService.deleteUser(userId);
    return { message: `User with ID ${userId} deleted successfully` };
  }

  // GET /users - Get all users
  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
}
