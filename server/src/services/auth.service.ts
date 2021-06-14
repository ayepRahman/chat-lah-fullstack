import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";
import { JWT_SECRET, JWT_EXPIRY, GOOGLE_CLIENT_ID } from "constants/env";
import jwt from "jsonwebtoken";
import { ErrorMessage } from "enums/ErrorMessage";

export class AuthService {
  googleClient: OAuth2Client;

  constructor() {
    this.googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);
  }

  isPasswordMatch = async (password: string, userPassword: string) => {
    return bcrypt.compareSync(password, userPassword);
  };

  getAccessToken = async (_id: string) => {
    return jwt.sign({ _id }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
  };

  verifyGoogleAuthToken = async (idToken: string) => {
    try {
      const ticket = await this.googleClient.verifyIdToken({
        idToken,
        audience: GOOGLE_CLIENT_ID,
      });

      return ticket.getPayload();
    } catch (error) {
      throw new Error(ErrorMessage.GOOGLE_TOKEN_NOT_VERIFY);
    }
  };
}
