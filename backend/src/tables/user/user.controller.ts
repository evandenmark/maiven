import { Controller, Post, Delete, Get, Body, Param, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../../auth/auth.guard';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  // Get all users
  @UseGuards(JwtAuthGuard) // Protect this route with JWT auth
  @Get()
  async getUsers() {
    return await this.userService.findAll();
  }

  //get user by auth0 id
  @UseGuards(JwtAuthGuard)
  @Get('auth0/:auth0Id')
  async getUserByAuth0Id(@Param('auth0Id') auth0Id: string) {
    return await this.userService.findUserByAuth0Id(auth0Id);
  }

  // Automatically sync user data on login
  @UseGuards(JwtAuthGuard)
  @Post('sync')
  async syncUser(@Req() req) {
    const { auth0Id, email, name } = req.user;
    return this.userService.findOrCreateUser(auth0Id, email, name);
  }

  // Delete user data associated with the Auth0 ID
  @UseGuards(JwtAuthGuard)
  @Delete(':userId') // Change 'me' to ':userId' to accept a user ID as a parameter
  async deleteUser(@Param('userId') userId: number) { // Accept userId as a parameter
    await this.userService.deleteUser(userId, );
    return { message: `User with ID ${userId} deleted successfully` };
  }

  // Retrieve the logged-in user’s profile data from Auth0 and sync
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Req() req) {

    const { auth0Id, email, name } = req.user;
    await this.userService.findOrCreateUser(auth0Id, email, name); // Optional: Ensure sync on each request
    return { auth0Id, email, name };
  }

}
