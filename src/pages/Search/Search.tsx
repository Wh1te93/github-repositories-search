import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Alert, Slide, Snackbar } from "@mui/material";
import { SlideProps } from "@mui/material/Slide";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useAppDispatch, useAppSelector } from "hooks";
import { useGetRepositoriesByNameQuery } from "services";
import { RootState } from "store";
import { RepositoryData } from "types";

import {
  changeOrder,
  changeOrderBy,
  changePage,
  changeRowsPerPage,
  updateSearchFilter,
} from "features/searchFilter";

import { Details } from "./Details/Details";
import EnhancedTable from "./Table/Table";
import { Order } from "./Table/types";

import styles from "./search.module.scss";

export const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedItem, setSelectedItem] = useState<RepositoryData | null>(null);
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  const dispatch = useAppDispatch();

  const searchFilter = useAppSelector((state: RootState) => state.searchFilter);

  const ref = useRef<HTMLElement>(null);

  function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="up" />;
  }

  useEffect(() => {
    if (searchFilter.searchStr) {
      setSearchParams({
        name: searchFilter.searchStr,
        perPage: searchFilter.rowsPerPage.toString(),
        page: searchFilter.page.toString(),
        sort: searchFilter.orderBy,
        order: searchFilter.order,
      });

      if (ref.current) {
        ref.current.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [searchFilter, setSearchParams]);

  useEffect(() => {
      if (searchParams.get("name")) {
          dispatch(
              updateSearchFilter({
                  searchStr: searchParams.get("name") || "",
                  rowsPerPage: Number(searchParams.get("perPage")) || 5,
                  page: Number(searchParams.get("page")) || 0,
                  orderBy: searchParams.get("sort") || "stars",
                  order: (searchParams.get("order") as Order) || "desc",
              }),
          );
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data, error, isFetching } = useGetRepositoriesByNameQuery<{
    data: { items: []; total_count: number };
    error: FetchBaseQueryError;
    isLoading: boolean;
    isFetching: boolean;
  }>(
    {
      name: searchFilter.searchStr,
      perPage: searchFilter.rowsPerPage,
      page: searchFilter.page + 1,
      sort: searchFilter.orderBy,
      order: searchFilter.order,
    },
    { skip: !searchFilter.searchStr },
  );

  useEffect(() => {
    setShowErrorMsg(!!error);
  }, [error]);

  const formattedData = useMemo(
    () =>
      data?.items.map((el: RepositoryData) => {
        const date = new Date(Date.parse(el?.updated_at));

        const formattedDate = date.toLocaleDateString("ru-ru");

        return { ...el, updated_at: formattedDate };
      }) || [],
    [data],
  );

  return (
    <div className={styles.search}>
      <div className={styles.searchResults}>
        <h3>Результаты поиска</h3>
        <EnhancedTable
          items={formattedData}
          totalCount={data?.total_count || 0}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          rowsPerPage={searchFilter.rowsPerPage}
          setRowsPerPage={(value) => dispatch(changeRowsPerPage(value))}
          page={data?.total_count ? searchFilter.page : 0}
          setPage={(value) => dispatch(changePage(value))}
          orderBy={searchFilter.orderBy}
          setOrderBy={(value) => dispatch(changeOrderBy(value))}
          order={searchFilter.order}
          setOrder={(value) => dispatch(changeOrder(value))}
          loading={isFetching}
          ref={ref}
        />
      </div>
      <Details selectedItem={selectedItem} />
      <Snackbar
        open={showErrorMsg}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        TransitionComponent={SlideTransition}
      >
        <Alert
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
          onClose={() => setShowErrorMsg(false)}
        >
          Что то пошло не так
        </Alert>
      </Snackbar>
    </div>
  );
};
