export interface GetCurrentUserData {
  currentUser: {
    _id: string;
    email: string;
    username: string;
    imgUrl: string;
  };
}
