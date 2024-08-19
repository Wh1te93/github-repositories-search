import { Dispatch, MouseEvent, SetStateAction } from "react";
import { RepositoryData } from "types";

export type Order = "asc" | "desc";

export type HeadCell = {
  id: string;
  label: string;
  numeric: boolean;
  sortEnabled: boolean;
};

export const headCells: readonly HeadCell[] = [
  {
    id: "name",
    numeric: false,
    label: "Название",
    sortEnabled: false,
  },
  {
    id: "language",
    numeric: false,
    label: "Язык",
    sortEnabled: false,
  },
  {
    id: "forks",
    numeric: true,
    label: "Число форков",
    sortEnabled: true,
  },
  {
    id: "stars",
    numeric: true,
    label: "Число звезд",
    sortEnabled: true,
  },
  {
    id: "updated",
    numeric: false,
    label: "Дата обновления",
    sortEnabled: true,
  },
];

export type EnhancedTableHeadProps = {
  onRequestSort: (event: MouseEvent<unknown>, property: string) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
};

export type EnhancedTableProps = {
  items: RepositoryData[];
  selectedItem: RepositoryData | null;
  setSelectedItem: Dispatch<SetStateAction<RepositoryData | null>>;
  rowsPerPage: number;
  setRowsPerPage: (value: number) => void;
  totalCount: number;
  page: number;
  setPage: (value: number) => void;
  orderBy: string;
  setOrderBy: (value: string) => void;
  order: Order;
  setOrder: (value: Order) => void;
  loading?: boolean;
};
