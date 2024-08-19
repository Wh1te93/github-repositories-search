import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "pages/Search/Table/types";
import { SearchFilter } from "types";

const initialState: SearchFilter = {
  searchStr: "",
  page: 0,
  rowsPerPage: 10,
  order: "desc",
  orderBy: "stars",
};

export const searchFilterSlice = createSlice({
  name: "searchFilter",
  initialState,
  reducers: {
    updateSearchFilter: (state, action: PayloadAction<SearchFilter>) =>
      action.payload,
    changePage: (state, action: PayloadAction<number>) => ({
      ...state,
      page: action.payload,
    }),
    changeRowsPerPage: (state, action: PayloadAction<number>) => ({
      ...state,
      rowsPerPage: action.payload,
    }),
    changeSearchStr: (state, action: PayloadAction<string>) => ({
      ...state,
      searchStr: action.payload,
      page: 0,
    }),
    changeOrderBy: (state, action: PayloadAction<string>) => ({
      ...state,
      orderBy: action.payload,
    }),
    changeOrder: (state, action: PayloadAction<Order>) => ({
      ...state,
      order: action.payload,
    }),
  },
});

export const {
  updateSearchFilter,
  changeSearchStr,
  changePage,
  changeRowsPerPage,
  changeOrder,
  changeOrderBy,
} = searchFilterSlice.actions;
