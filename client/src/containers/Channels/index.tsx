import React from "react";
import { useQueryParam, StringParam } from "use-query-params";
import { Box, Text, Flex, useToast, Stack, Skeleton } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { RiArrowDropUpLine, RiArrowDropDownLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { ContentMotion } from "./styled";
import { CONTENTS_VARIANTS, CONTENT_VARIANT } from "./variants";
import { GET_CHANNELS } from "./gql";
import { GetChannelData } from "./interfaces";
import { UrlParams } from "enums/UrlParams";

const Channels = () => {
  const toast = useToast();
  const [, setQuery] = useQueryParam(UrlParams.CHANNEL_ID, StringParam);
  const [isOpen, setIsOpen] = React.useState<boolean>(true);
  const { data, loading } = useQuery<GetChannelData>(GET_CHANNELS, {
    onError: ({ message }) => {
      toast({
        title: message,
        status: "error",
        isClosable: true,
      });
    },
  });

  return (
    <Box with="100%">
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize="small" fontWeight="bold">
          CHANNELS
        </Text>
        <Box cursor="pointer" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <RiArrowDropDownLine size="1.5rem" />
          ) : (
            <RiArrowDropUpLine size="1.5rem" />
          )}
        </Box>
      </Flex>
      <motion.div initial={true} animate={isOpen ? "open" : "closed"}>
        <motion.div variants={CONTENTS_VARIANTS}>
          {loading && !data ? (
            <Stack>
              <Skeleton height="2rem" />
              <Skeleton height="2rem" />
              <Skeleton height="2rem" />
            </Stack>
          ) : (
            data?.channels.map((channel) => {
              return (
                <ContentMotion
                  fontSize="smaller"
                  cursor="pointer"
                  variants={CONTENT_VARIANT}
                  key={channel._id}
                  onClick={() => setQuery(channel._id)}
                >
                  # {channel.name}
                </ContentMotion>
              );
            })
          )}
        </motion.div>
      </motion.div>
    </Box>
  );
};

export default Channels;
