// https://github.com/MichalLytek/type-graphql/blob/v1.1.1/examples/simple-subscriptions/resolver.ts
// https://dev.to/phyllis_yym/beginner-s-guide-to-google-oauth-with-passport-js-2gh4

import { ValidationError } from "apollo-server-express";
import { Resolver, Mutation, Arg } from "type-graphql";
import { UserService } from "services/user.service";
import { AuthService } from "services/auth.service";
import { ResponseStatus } from "dtos/status.dto";
import { ResponseStatusEnum } from "enums/ResponseStatusEnum";
import { LoggedInUserDto } from "dtos/user.dto";
import { RegisterUserInputDto, LoginInputDto } from "dtos/auth.dto";
import { ErrorMessage } from "enums/ErrorMessage";

@Resolver()
export class AuthResolver {
  userService: UserService;
  authService: AuthService;

  constructor() {
    this.userService = new UserService();
    this.authService = new AuthService();
  }

  @Mutation(() => LoggedInUserDto)
  async login(@Arg("input") input: LoginInputDto): Promise<LoggedInUserDto> {
    const { email, password } = input;
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new ValidationError(ErrorMessage.USER_NOT_FOUND);
    }

    await this.authService.isPasswordMatch(password, user?.password || "");
    const accessToken = await this.authService.getAccessToken(user?._id);

    return {
      _id: user?._id || "",
      username: user?.username || "",
      email: user?.email || "",
      imgUrl: user?.imgUrl || "",
      accessToken: accessToken || "",
    };
  }

  @Mutation(() => LoggedInUserDto)
  async googleLogin(
    @Arg("googleIdToken") googleIdToken: string
  ): Promise<LoggedInUserDto> {
    try {
      const payload = await this.authService.verifyGoogleAuthToken(
        googleIdToken
      );

      const user = await this.userService.findOrCreateUser({
        username: payload?.name || "",
        email: payload?.email || "",
        imgUrl: payload?.picture,
      });

      if (!user) {
        throw new ValidationError(ErrorMessage.USER_NOT_FOUND);
      }

      const accessToken = await this.authService.getAccessToken(user._id);

      return {
        _id: user._id,
        username: user.username,
        email: user.email,
        imgUrl: user.imgUrl,
        accessToken,
      };
    } catch (error) {
      throw new Error(ErrorMessage.COMMON);
    }
  }

  @Mutation(() => ResponseStatus)
  async register(
    @Arg("input") input: RegisterUserInputDto
  ): Promise<ResponseStatus> {
    await this.userService.checkUserNameExist(input.username);
    await this.userService.checkUserEmailExist(input.email);
    const user = await this.userService.create({
      username: input.username,
      email: input.email,
      password: input.password,
    });

    if (!user) {
      return {
        result: ResponseStatusEnum.SUCCESS,
      };
    } else {
      return {
        result: ResponseStatusEnum.SUCCESS,
      };
    }
  }
}
