import { ApolloClient, ApolloLink, HttpLink, split } from "@apollo/client";
import { onError, ErrorResponse } from "@apollo/client/link/error";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
import { setContext } from "@apollo/client/link/context";
import { SERVER_URL, WS_URL } from "constants/env";
import { LocalStorage } from "enums/LocalStorage";
import { Routes } from "enums/Routes";
import { cache } from "apollo/cache";

console.log("SERVER>>> LAHs", SERVER_URL);

// Error handling guide -
// https://www.apollographql.com/blog/graphql/error-handling/full-stack-error-handling-with-graphql-apollo/
const errorLink = onError(({ graphQLErrors, networkError }: ErrorResponse) => {
  if (graphQLErrors) {
    console.error("[graphQLErrors]", graphQLErrors);
    for (let err of graphQLErrors) {
      // handle errors differently based on its error code
      switch (err?.extensions?.code) {
        case "UNAUTHENTICATED":
          window.location.replace(Routes.LOGIN);
          localStorage.clear();
          break;
        // handle other errors
        // case "ANOTHER_ERROR_CODE":
        // ...
      }
    }
  }

  if (networkError) {
    // eslint-disable-next-line no-console
    console.error("[networkError]", networkError);
  }
});

const wsLink = new WebSocketLink({
  uri: WS_URL,
  options: {
    reconnect: true,
  },
});

const authLink = setContext((_, { headers }) => {
  try {
    const accessToken = localStorage.getItem(LocalStorage.X_TOKEN);
    return {
      headers: {
        ...headers,
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    };
  } catch ({ message }) {
    // eslint-disable-next-line no-console
    console.error("[authLink] - Error", message);
    if (window.location.pathname !== Routes.LOGIN)
      window.location.replace(Routes.LOGIN);
  }
});

const httpLink = new HttpLink({
  uri: `${SERVER_URL}`,
  // credentials: "include", // TODO: add cors
});

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const link = ApolloLink.from([errorLink, authLink, splitLink]);

export const client = new ApolloClient({
  link,
  cache,
});
