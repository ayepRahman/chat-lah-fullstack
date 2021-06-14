import { InMemoryCache } from "@apollo/client";

export const cache = new InMemoryCache({
  //   typePolicies: {
  //     PaginationChannelDto: {
  //       fields: {
  //         messages: {
  //           read: (existing) => {
  //             console.log("READ", existing);
  //             return existing;
  //           },
  //           merge: (existing, incoming) => {
  //             console.log("merge", {
  //               existing,
  //               incoming,
  //             });
  //             // if (!existing) return incoming;
  //             // if (!incoming) return existing;
  //             // return {
  //             //   ...existing,
  //             //   messages: [
  //             //     ...existing?.channel?.messages,
  //             //     ...incoming?.channel?.messages,
  //             //   ],
  //             // };
  //           },
  //         },
  //       },
  //     },
  //   },
});
