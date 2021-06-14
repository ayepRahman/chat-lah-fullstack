import { ValidationError } from "apollo-server-express";
import { ErrorMessage } from "enums/ErrorMessage";
import { UserModel, User } from "models/user.model";
import { DocumentType } from "@typegoose/typegoose";
import { CreateUserDto, FindOrCreateUserDto } from "dtos/user.dto";
import { Types } from "mongoose";

export class UserService {
  userModel = UserModel;

  async checkUserNameExist(username: string) {
    const user = await this.userModel.findOne({ username });
    if (!!user) {
      throw new ValidationError(ErrorMessage.USERNAME_EXIST);
    }
  }

  async checkUserEmailExist(email: string) {
    const user = await this.userModel.findOne({ email });
    if (!!user) {
      throw new ValidationError(ErrorMessage.EMAIL_EXIST);
    }
  }

  async create(props: CreateUserDto): Promise<DocumentType<User>> {
    const createdUser = new this.userModel({
      createdAt: new Date(),
      ...props,
    });
    return createdUser.save();
  }

  async findAll(): Promise<DocumentType<User>[]> {
    return this.userModel.find().exec();
  }

  async findOneById(_id: Types.ObjectId): Promise<DocumentType<User> | null> {
    return this.userModel.findById(_id);
  }

  async findOneByEmail(email: string): Promise<DocumentType<User> | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findOneByUsername(
    username: string
  ): Promise<DocumentType<User> | null> {
    const user = await this.userModel.findOne({ username }).exec();

    if (!user) {
      throw new ValidationError(ErrorMessage.USER_NOT_FOUND);
    }

    return user;
  }

  async findOrCreateUser(
    props: FindOrCreateUserDto
  ): Promise<DocumentType<User>> {
    const user = await this.findOneByEmail(props.email);
    if (!user) {
      return await this.create({
        ...props,
      });
    } else {
      return user;
    }
  }
}
