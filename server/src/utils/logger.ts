import chalk from "chalk";

export enum LogMessageType {
  SUCCESS = "SUCCESS",
  FAILURE = "FAILURE",
  WARNING = "WARNING",
}

export const LogIcon = {
  [LogMessageType.SUCCESS]: "🚀",
  [LogMessageType.FAILURE]: "🚨",
  [LogMessageType.WARNING]: "⚠️",
};

export default (type: LogMessageType, message: string) => {
  const msg = `${LogIcon[type]} [${LogMessageType[type]}]: ${message}`;

  switch (type) {
    case LogMessageType.SUCCESS:
      console.log(chalk.green(msg));
      break;
    case LogMessageType.WARNING:
      console.log(chalk.yellow(msg));
      break;
    case LogMessageType.FAILURE:
      console.log(chalk.red(msg));
      break;
  }
};
