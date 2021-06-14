import {
  Query,
  Arg,
  UseMiddleware,
  Subscription,
  Root,
  PubSub,
  PubSubEngine,
  Resolver,
  Mutation,
} from "type-graphql";
import { ChannelService } from "services/channel.service";
import { UserService } from "services/user.service";
import { AuthorizedUser } from "decorator/AuthUser";
import { ResponseStatus } from "dtos/status.dto";
import { ResponseStatusEnum } from "enums/ResponseStatusEnum";
import { CurrentUser } from "decorator/CurrentUser";
import { CurrentUserDto } from "dtos/user.dto";
import {
  AddChannelMessageInputDto,
  BaseChannelDto,
  CreateChannelInputDto,
  PaginationChannelDto,
} from "dtos/channel.dto";
import { ErrorMessage } from "enums/ErrorMessage";
import { ValidationError } from "apollo-server-express";
import { PaginationInputDto } from "dtos/pagination.dto";
import { SubscribeTopics } from "enums/SubscribeTopics";
import { BaseMessageDto, MessagePayload } from "dtos/message.dto";
import { Types } from "mongoose";

@Resolver()
export class ChannelResolver {
  channelService: ChannelService;
  userService: UserService;

  constructor() {
    this.channelService = new ChannelService();
    this.userService = new UserService();
  }

  @Query(() => [BaseChannelDto])
  @UseMiddleware(AuthorizedUser)
  async channels(): Promise<BaseChannelDto[]> {
    return await this.channelService.findAll();
  }

  @Query(() => PaginationChannelDto, { nullable: true })
  @UseMiddleware(AuthorizedUser)
  async channel(
    @Arg("channelId") channelId: Types.ObjectId,
    @Arg("paginationInput", { nullable: true })
    paginationInput: PaginationInputDto
  ): Promise<PaginationChannelDto | null> {
    return await this.channelService.getChannelPagination(
      channelId,
      paginationInput.limit,
      paginationInput.skip
    );
  }

  @Mutation(() => ResponseStatus)
  @UseMiddleware(AuthorizedUser)
  async createChannel(
    @Arg("input") input: CreateChannelInputDto,
    @CurrentUser() currentUser: CurrentUserDto
  ): Promise<ResponseStatus> {
    await this.channelService.checkChannelNameExist(input.name);
    const channel = await this.channelService.create({
      ownerId: currentUser._id,
      ...input,
    });

    if (!channel) {
      return {
        result: ResponseStatusEnum.FAILURE,
      };
    } else {
      return {
        result: ResponseStatusEnum.SUCCESS,
      };
    }
  }

  @Mutation(() => ResponseStatus)
  @UseMiddleware(AuthorizedUser)
  async addChannelMessages(
    @PubSub() pubSub: PubSubEngine,
    @CurrentUser() currentUser: CurrentUserDto,
    @Arg("input") input: AddChannelMessageInputDto
  ): Promise<ResponseStatus> {
    const user = await this.userService.findOneById(currentUser._id);

    if (!user) {
      throw new ValidationError(ErrorMessage.USER_NOT_FOUND);
    } else {
      const message = await this.channelService.addMessage(
        input.channelId,
        input.text,
        user
      );
      if (message) {
        const messagePayload: MessagePayload = {
          channelId: input.channelId,
          message: {
            _id: message?._id,
            createdAt: message.createdAt,
            text: message.text,
            user: {
              _id: message.user._id,
              username: message.user.username,
              email: message.user.email,
              imgUrl: message.user.imgUrl,
            },
          },
        };

        await pubSub.publish(SubscribeTopics.NEW_MESSAGE, messagePayload);
        return {
          result: ResponseStatusEnum.SUCCESS,
        };
      } else {
        return {
          result: ResponseStatusEnum.FAILURE,
        };
      }
    }
  }

  @Subscription(() => BaseMessageDto, {
    nullable: true,
    topics: SubscribeTopics.NEW_MESSAGE,
    filter: ({
      payload,
      args,
    }: {
      payload: MessagePayload;
      args: { channelId: Types.ObjectId };
    }) => {
      // @desc: to ensure we're only subscribing by channelId.
      return args.channelId.equals(`${payload.channelId}`);
    },
  })
  async newMessage(
    @Root() messsagePayload: MessagePayload,
    @Arg("channelId") channeldId: Types.ObjectId
  ): Promise<BaseMessageDto | null> {
    return messsagePayload.message;
  }
}
