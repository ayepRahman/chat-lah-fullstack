import { ValidationError } from "apollo-server-express";
import { Resolver, Query, UseMiddleware } from "type-graphql";
import { UserService } from "services/user.service";
import { AuthorizedUser } from "decorator/AuthUser";
import { CurrentUserDto, BaseUserDto } from "dtos/user.dto";
import { CurrentUser } from "decorator/CurrentUser";
import { ErrorMessage } from "enums/ErrorMessage";

@Resolver()
export class UserResolver {
  userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  @UseMiddleware(AuthorizedUser)
  @Query(() => BaseUserDto)
  async currentUser(
    @CurrentUser() currentUser: CurrentUserDto
  ): Promise<BaseUserDto> {
    const user = await this.userService.findOneById(currentUser._id);

    if (!user) {
      throw new ValidationError(ErrorMessage.USER_NOT_FOUND);
    }

    return {
      _id: user?._id,
      username: user?.username || "",
      email: user?.email || "",
      imgUrl: user?.imgUrl || "",
    };
  }
}
