export interface GetGoogleLoginData {
  googleLogin: {
    _id: string;
    username: string;
    accessToken: string;
    imgUrl: string;
  };
}

export interface GetGoogleLoginVar {
  googleIdToken: string;
}
