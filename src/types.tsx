import { Order } from "pages/Search/Table/types";

export type SearchFilter = {
  searchStr: string;
  page: number;
  rowsPerPage: number;
  order: Order;
  orderBy: string;
};

export type RepositoryData = {
  id: number;
  language: string;
  forks_count: number;
  stargazers_count: number;
  name: string;
  updated_at: string;
  topics: string[];
  license: { name: string } | null;
};
