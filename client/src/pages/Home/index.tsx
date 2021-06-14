import React from "react";
import { Grid, GridItem, Box, Flex, Text } from "@chakra-ui/react";
import UserDetailsCard from "containers/UserDetailsCard";
import ChannelAddMessage from "containers/ChannelAddMessage";
import ChannelMessageHeader from "containers/ChannelMessageHeader";
import ChannelMessages from "containers/ChannelMessages";
import Channels from "containers/Channels";
import { StringParam, useQueryParam } from "use-query-params";
import { UrlParams } from "enums/UrlParams";

const Home = () => {
  const [cid] = useQueryParam(UrlParams.CHANNEL_ID, StringParam);

  return (
    <Grid
      p="1rem"
      h="100vh"
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(16, 1fr)"
      gap={8}
    >
      <GridItem rowSpan={2} colSpan={4}>
        <Box height="30%">
          <Flex alignItems="center" mb="1rem">
            <Text fontWeight="bold" fontSize="xl" ml="0.5rem">
              ChatLah
            </Text>
          </Flex>
          <UserDetailsCard />
        </Box>
        <Box height="calc(70% - 1rem)" overflowY="auto">
          <Channels />
        </Box>
      </GridItem>
      <GridItem
        position="relative"
        overflow="hidden"
        rowSpan={2}
        colSpan={12}
        background="gray.100"
        border="1px solid"
        borderRadius="md"
        borderColor="gray.200"
        padding="1rem"
      >
        {cid ? (
          <>
            <ChannelMessageHeader />
            <ChannelMessages />
            <ChannelAddMessage />
          </>
        ) : (
          <Flex
            height="100%"
            width="100%"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            <div>
              <Text fontSize="3xl" fontWeight="bold">
                🎉 Welcome to ChatLah!
              </Text>
              <Text>Get started by clicking one of the Channels!</Text>
            </div>
          </Flex>
        )}
      </GridItem>
    </Grid>
  );
};

export default Home;
