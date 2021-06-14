import { connect } from "mongoose";
import { MONGO_DB_URL, MONGO_DB_NAME } from "constants/env";
import logger, { LogMessageType } from "utils/logger";

const options = {
  dbName: "",
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

export const mongooseConnect = async () => {
  try {
    await connect(`${MONGO_DB_URL}/${MONGO_DB_NAME}`, options);
    logger(
      LogMessageType.SUCCESS,
      `MongoDB is connected: ${MONGO_DB_URL}/${MONGO_DB_NAME}`
    );
  } catch (error) {
    logger(LogMessageType.FAILURE, `Failure connecting to MongoDB => ${error}`);
  }
};
