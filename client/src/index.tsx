import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "@emotion/react";
import { client } from "apollo";
import { theme } from "styles";
import App from "containers/App";
import reportWebVitals from "./reportWebVitals";
import "@fontsource/roboto";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <QueryParamProvider ReactRouterRoute={Route}>
          <ChakraProvider theme={theme}>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </ChakraProvider>
        </QueryParamProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
