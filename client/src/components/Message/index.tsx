import React from "react";
import { formatDistanceStrict } from "date-fns";
import { Box, Flex, Text, Avatar, AvatarBadge } from "@chakra-ui/react";
import { MessageProps } from "./interfaces";

const Message: React.FC<MessageProps> = ({
  createdAt,
  username,
  text,
  imgUrl,
  isCurrentUser,
}) => {
  return (
    <Box width="100%" marginTop="2rem">
      <Flex
        width="100%"
        alignItems="top"
        flexDirection={isCurrentUser ? "row-reverse" : "row"}
      >
        <Text color="gray.500" fontSize="x-small" m="0 4rem 0.5rem">
          {`${username}, ${formatDistanceStrict(
            new Date(createdAt),
            new Date()
          )}`}
        </Text>
      </Flex>
      <Flex
        width="100%"
        alignItems="top"
        flexDirection={isCurrentUser ? "row-reverse" : "row"}
      >
        <Avatar size="md" src={imgUrl} name={username}>
          <AvatarBadge
            borderColor="gray.50"
            boxSize="0.5rem"
            bg={true ? "green.500" : "red.500"}
          />
        </Avatar>
        <Box
          margin="0 1rem"
          padding="1rem"
          maxWidth="40%"
          borderRadius="0.5rem"
          background={isCurrentUser ? "purple.400" : "white"}
          color={isCurrentUser ? "white" : "black"}
        >
          {text}
        </Box>
      </Flex>
    </Box>
  );
};

export default Message;
