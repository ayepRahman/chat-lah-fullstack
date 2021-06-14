import { ValidationError } from "apollo-server-express";
import { ErrorMessage } from "enums/ErrorMessage";
import { ChannelModel, Channel } from "models/channel.model";
import { DocumentType } from "@typegoose/typegoose";
import { CreateChannelDto, PaginationChannelDto } from "dtos/channel.dto";
import { User } from "models/user.model";
import { Types } from "mongoose";
import { Message } from "models/message.model";

export class ChannelService {
  channelModel = ChannelModel;

  async checkChannelNameExist(name: string) {
    const user = await this.channelModel.findOne({ name });
    if (!!user) {
      throw new ValidationError(ErrorMessage.CHANNEL_NAME_EXIST);
    }
  }

  async create(props: CreateChannelDto): Promise<DocumentType<Channel>> {
    const createdChannel = new this.channelModel({
      ...props,
    });
    return createdChannel.save();
  }

  async addMessage(
    channelId: Types.ObjectId,
    text: string,
    user: User
  ): Promise<Message | null> {
    const message = await this.channelModel.findOneAndUpdate(
      { _id: channelId },
      { $push: { messages: { createdAt: new Date(), user, text } } },
      {
        upsert: true,
        new: true,
        fields: "messages",
      }
    );

    return message?.messages?.[message?.messages?.length - 1] || null;
  }

  async findAll(): Promise<DocumentType<Channel>[]> {
    return this.channelModel.find().exec();
  }

  async findOneById(_id: string): Promise<DocumentType<Channel> | null> {
    return this.channelModel.findById(_id).exec();
  }

  async aggregate(aggregateOptions: any[]): Promise<DocumentType<Channel>[]> {
    return this.channelModel.aggregate([...aggregateOptions]);
  }

  async getChannelPagination(
    channelId: Types.ObjectId,
    limit?: number,
    skip?: number
  ): Promise<PaginationChannelDto | null> {
    // for sorting array field -
    // https://stackoverflow.com/questions/15388127/mongodb-sort-inner-array
    let getChannelAggregate: any[] = [
      {
        $match: { _id: channelId },
      },
      {
        $unwind: "$messages",
      },
      {
        $sort: {
          // default to descending for messages
          "messages.createdAt": -1,
        },
      },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ];

    if (skip) {
      getChannelAggregate.splice(getChannelAggregate.length - 1, 0, {
        $skip: skip,
      });
    }

    if (limit) {
      getChannelAggregate.splice(getChannelAggregate.length - 1, 0, {
        $limit: limit,
      });
    }

    const messagesCount = await this.getMessagesCountById(channelId);
    const channelsResponse = await this.aggregate(getChannelAggregate);

    let hasNext = false;

    if (limit || skip) {
      hasNext = (limit || 0) + (skip || 0) < messagesCount;
    }

    if (!channelsResponse.length) {
      return null;
    } else {
      return {
        ...channelsResponse[0],
        pageInfo: {
          hasNext,
        },
      };
    }
  }

  async getMessagesCountById(_id: Types.ObjectId): Promise<number> {
    const response = await this.channelModel.aggregate([
      {
        $match: { _id },
      },
      { $project: { count: { $size: "$messages" } } },
    ]);

    return response?.[0]?.count || 0;
  }
}
