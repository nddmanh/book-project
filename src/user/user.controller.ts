import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './models/user.models';
import { UserUpdateDto } from './dto/userUpdate.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOkResponse({ description: 'Register new user successfully' })
  async createUser(@Body() userDto: User) {
    return this.userService.createUser(userDto);
  }

  @Post('login')
  @ApiOkResponse({ description: 'Insert new user successfully' })
  async login(@Body() userDto: User) {
    return this.userService.createUser(userDto);
  }

  @Get()
  readUser() {
    return this.userService.readUser();
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Update user successfully' })
  async updateUser(
    @Param('id') id: string,
    @Body() updateData: UserUpdateDto,
  ): Promise<User> {
    return this.userService.updateUser(id, updateData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
