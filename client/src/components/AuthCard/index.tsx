import React from "react";
import {
  Box,
  BoxProps,
  useMediaQuery,
  useTheme,
  ChakraTheme,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion<BoxProps>(Box);

const AuthCard: React.FC = ({ children }) => {
  const { breakpoints } = useTheme<ChakraTheme>();
  const [isMobile, isTablet, isDesktop] = useMediaQuery([
    `(min-width: ${breakpoints.base}) and (max-width: ${breakpoints.sm})`,
    `(min-width: ${breakpoints.sm}) and (max-width: ${breakpoints.md})`,
    `(min-width: ${breakpoints.md})`,
  ]);

  const boxWidth: string = isMobile
    ? "90vw"
    : isTablet
    ? "70vw"
    : isDesktop
    ? "25rem"
    : "25rem";

  return (
    <MotionBox
      border="1px solid"
      borderColor="gray.50"
      background="white"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {
          opacity: 0,
          transform: "translateY(2rem)",
          transitionDuration: "0.3s",
        },
        visible: {
          opacity: 1,
          transform: "translateY(0rem)",
        },
      }}
      width={boxWidth}
      padding="2rem"
      boxShadow="xl"
      borderRadius="0.5rem"
    >
      {children}
    </MotionBox>
  );
};

export default AuthCard;
