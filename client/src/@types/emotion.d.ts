// @dev configuration to work with typescipt - https://styled-components.com/docs/api#typescript
import "@emotion/react";
import { Theme as ChakraTheme } from "@chakra-ui/react";

declare module "@emotion/react" {
  export interface Theme extends ChakraTheme {}
}
