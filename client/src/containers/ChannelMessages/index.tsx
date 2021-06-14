import React from "react";
import { useQuery } from "@apollo/client";
import {
  Box,
  Flex,
  SkeletonCircle,
  useToast,
  Text,
  Skeleton,
} from "@chakra-ui/react";
import InfiniteScroll from "react-infinite-scroll-component";
import { StringParam, useQueryParam } from "use-query-params";
import {
  GET_CHANNEL_BY_ID,
  GET_CURRENT_USER,
  NEW_CHANNEL_MESSAGE_SUB,
} from "./gql";
import Message from "components/Message";
import { UrlParams } from "enums/UrlParams";
import {
  GetUserData,
  GetChannelByIdData,
  GetChannelByIdVar,
  NewChannelMessageData,
} from "./interfaces";

const CHANNEL_MESSAGES_ID = "channel-messages-id";
const INITIAL_QUERY_OPTIONS = {
  limit: 10,
  skip: 0,
};

const ChannelMessages = () => {
  const toast = useToast();
  const [cid] = useQueryParam(UrlParams.CHANNEL_ID, StringParam);

  const { data: userData } = useQuery<GetUserData>(GET_CURRENT_USER, {
    onError: ({ message }) => {
      toast({
        title: message,
        status: "error",
        isClosable: true,
      });
    },
  });
  const {
    data: channelData,
    loading,
    fetchMore,
    subscribeToMore,
  } = useQuery<GetChannelByIdData, GetChannelByIdVar>(GET_CHANNEL_BY_ID, {
    skip: !cid,
    variables: {
      channelId: cid || "",
      paginationInput: {
        limit: INITIAL_QUERY_OPTIONS.limit,
        skip: INITIAL_QUERY_OPTIONS.skip,
      },
    },
    onError: ({ message }) => {
      toast({
        title: message,
        status: "error",
        isClosable: true,
      });
    },
  });

  React.useEffect(() => {
    if (subscribeToMore) {
      subscribeToMore<NewChannelMessageData>({
        document: NEW_CHANNEL_MESSAGE_SUB,
        variables: {
          channelId: cid || "",
        },
        updateQuery: (prev, { subscriptionData }) => {
          console.log({
            prev,
            subscriptionData,
          });
          if (!subscriptionData.data) return prev;
          const newMessage = subscriptionData.data.newMessage;

          return Object.assign({}, prev, {
            channel: {
              ...prev.channel,
              messages: [newMessage, ...(prev.channel?.messages || [])],
            },
          });
        },
      });
    }
  }, [cid, subscribeToMore]);

  const messages = channelData?.channel?.messages || [];

  const handleFetchMore = () => {
    if (fetchMore) {
      fetchMore({
        variables: {
          channelId: cid,
          paginationInput: {
            skip: messages.length,
            limit: INITIAL_QUERY_OPTIONS.limit,
          },
        },
        updateQuery: (prev: GetChannelByIdData, { fetchMoreResult }) => {
          if (!fetchMoreResult?.channel || !prev?.channel) return prev;
          return {
            channel: {
              ...prev.channel,
              messages: [
                ...prev.channel.messages,
                ...fetchMoreResult.channel.messages,
              ],
            },
          };
        },
      });
    }
  };

  return (
    <Box
      id={CHANNEL_MESSAGES_ID}
      height="calc(100% - 6rem)"
      width="calc(100% - 2rem)"
      display="flex"
      overflowY="auto"
      flexDirection="column-reverse"
      position="absolute"
      bottom="6rem"
      left="1rem"
      right="1rem"
    >
      <InfiniteScroll
        dataLength={messages.length}
        next={handleFetchMore}
        style={{
          display: "flex",
          flexDirection: "column-reverse",
        }} //To put endMessage and loader to the top.
        inverse={true} //
        hasMore={channelData?.channel?.pageInfo?.hasNext || true}
        loader={<></>}
        endMessage="Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, ea."
        scrollableTarget={CHANNEL_MESSAGES_ID}
      >
        {loading ? (
          <>
            <Flex mt="1rem">
              <SkeletonCircle size="3rem" mr="1rem" />
              <Skeleton borderRadius="0.5rem" width="10rem" height="3rem" />
            </Flex>
            <Flex mt="1rem">
              <SkeletonCircle size="3rem" mr="1rem" />
              <Skeleton borderRadius="0.5rem" width="10rem" height="3rem" />
            </Flex>
            <Flex mt="1rem">
              <SkeletonCircle size="3rem" mr="1rem" />
              <Skeleton borderRadius="0.5rem" width="10rem" height="3rem" />
            </Flex>
          </>
        ) : messages?.length ? (
          messages?.map((msg) => {
            return (
              <Message
                key={msg._id}
                isCurrentUser={msg.user._id === userData?.currentUser._id}
                createdAt={msg.createdAt}
                username={msg.user.username}
                imgUrl={msg.user.imgUrl}
                text={msg.text}
              />
            );
          })
        ) : (
          cid && (
            <Flex width="100%" justifyContent="center">
              <Text color="gray.500">
                🎉 This is the very beginning of your message history with this
                channel!
              </Text>
            </Flex>
          )
        )}
      </InfiniteScroll>
    </Box>
  );
};

export default ChannelMessages;
