import { Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";

const Content = styled(Text)`
  padding: 0.5rem;

  :hover {
    background: ${(p) => p.theme.colors.purple[500]};
    border-radius: 0.25rem;
    color: white;
  }
`;

export const ContentMotion = motion(Content);
