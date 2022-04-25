import { BadRequestException, Injectable } from '@nestjs/common';
import { User, UserDocument } from './models/user.models';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(user: User) {
    try {
      const userRec = await this.findOne(user.username);
      if (userRec) return { message: 'username is exist.' };
      const hashPassword = await argon2.hash(user.password);
      const newUser = new this.userModel(user);
      newUser.password = hashPassword;
      return newUser.save();
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async readUser() {
    return this.userModel
      .find({})
      .then((user) => {
        return user;
      })
      .catch((err) => console.log(err));
  }

  async updateUser(id, data): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteUser(id) {
    return this.userModel.findByIdAndRemove(id);
  }
  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username });
  }
}
