import React from "react";
import { Flex, SkeletonCircle, Skeleton } from "@chakra-ui/react";

const UserDetailsCardLoader = () => {
  return (
    <>
      <Flex mb="1rem" justifyContent="center">
        <SkeletonCircle size="16" />
      </Flex>
      <Skeleton m="0 auto 1rem" height="8px" width="50%" />
      <Skeleton m="0 auto" height="8px" width="60%" />
    </>
  );
};

export default UserDetailsCardLoader;
