import { Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";

export const Input = styled.input`
  height: 100%;
  width: 90%;
  border-radius: 1rem;
  transition: ease-in-out, width 0.35s ease-in-out;
  flex-grow: auto;
  padding-left: 0.5rem;

  &:focus {
    outline: none;
  }
`;

export const ChannelAddMessageBox = styled(Flex)`
  &:focus-within {
    outline: none;
    border: 1px solid ${(p) => p.theme.colors.purple[500]};
  }
`;
