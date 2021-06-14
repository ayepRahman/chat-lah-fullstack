import React from "react";
import { useQuery } from "@apollo/client";
import {
  Box,
  Flex,
  Text,
  Avatar,
  AvatarBadge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { GET_CURRENT_USER } from "./gql";
import UserDetailsCardLoader from "./UserDetailsCardLoader";
import useLogout from "hooks/useLogout";
import { GetCurrentUserData } from "./interfaces";

const UserDetailsCard: React.FC = () => {
  const { logout } = useLogout();
  const [
    isActive,
    // setIsActive
  ] = React.useState<boolean>(true);
  const { data, loading } = useQuery<GetCurrentUserData>(GET_CURRENT_USER);

  return (
    <Box
      background="gray.100"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      padding="1rem"
      mb="1rem"
    >
      {loading && !data ? (
        <UserDetailsCardLoader />
      ) : (
        <>
          <Flex justifyContent="center">
            <Menu isLazy>
              <MenuButton>
                <Avatar
                  size="lg"
                  src={data?.currentUser.imgUrl}
                  name={data?.currentUser.username}
                >
                  <AvatarBadge
                    borderColor="gray.50"
                    boxSize="1.5rem"
                    bg={isActive ? "green.500" : "red.500"}
                  />
                </Avatar>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => logout()}>Log out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          {data?.currentUser.username && (
            <Text mt="1rem" textAlign="center" fontSize="lg" fontWeight="500">
              {data?.currentUser.username}
            </Text>
          )}
          {data?.currentUser.email && (
            <Text textAlign="center" fontSize="sm">
              {data?.currentUser.email}
            </Text>
          )}
        </>
      )}
    </Box>
  );
};

export default UserDetailsCard;
