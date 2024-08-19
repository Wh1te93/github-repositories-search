import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Order } from "pages/Search/Table/types";

// Define a service using a base URL and expected endpoints
export const repositoriesApi = createApi({
  reducerPath: "repositoriesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  endpoints: (builder) => ({
    getRepositoriesByName: builder.query<
      {},
      {
        name: string;
        perPage: number;
        page: number;
        sort: string;
        order: Order;
      }
    >({
      query: ({ name, perPage, page, order, sort }) =>
        `https://api.github.com/search/repositories?q=${name}&per_page=${perPage}&page=${page}&order=${order}&sort=${sort}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetRepositoriesByNameQuery } = repositoriesApi;
