import { Box } from "@chakra-ui/react";

// TODO: integrate API for getting channel name

const ChannelMessageHeader = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      position="absolute"
      width="100%"
      top="0"
      right="0"
      left="0"
      height="4rem"
      padding="1rem"
      borderTopLeftRadius="0.5rem"
      borderTopRightRadius="0.5rem"
      backgroundColor="rgba(255, 255, 255, .15)"
      backdropFilter="blur(5px)"
      zIndex="2"
      boxShadow="md"
    >
      Amy Aiko
    </Box>
  );
};

export default ChannelMessageHeader;
