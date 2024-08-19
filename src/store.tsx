import { configureStore } from "@reduxjs/toolkit";

import { searchFilterSlice } from "./features/searchFilter";
import { repositoriesApi } from "./services";
// ...
const store = configureStore({
  reducer: {
    searchFilter: searchFilterSlice.reducer,
    [repositoriesApi.reducerPath]: repositoriesApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(repositoriesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
