import { FC, PropsWithChildren, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { useAppSelector } from "hooks";
import { RootState } from "store";

import { changeSearchStr } from "features/searchFilter";

import styles from "./layout.module.scss";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  const searchFilter = useAppSelector((state: RootState) => state.searchFilter);

  const [searchStr, setSearchStr] = useState<string>(searchFilter.searchStr);

  useEffect(() => {
    if (searchFilter.searchStr) {
      setSearchStr(searchFilter.searchStr);
    }
  }, [searchFilter.searchStr]);

  const isSearchPage = window.location.pathname.includes("search");

  const dispatch = useDispatch();

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.searchPanel}>
          <TextField
            id="outlined-basic"
            placeholder="Введите поисковый запрос"
            variant="outlined"
            size="small"
            sx={{
              width: "100%",
              maxWidth: "912px",
              marginRight: "8px",
              backgroundColor: "#F2F2F2",
              borderRadius: "4px",
              fontStyle: "italic",
            }}
            onChange={(e) => setSearchStr(e.target.value)}
            value={searchStr}
          />
          <Button
            component={isSearchPage ? "button" : Link}
            to={isSearchPage ? undefined : "/search"}
            onClick={() => dispatch(changeSearchStr(searchStr))}
            variant="contained"
            sx={{ height: "40px" }}
          >
            ИСКАТЬ
          </Button>
        </div>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer} />
    </div>
  );
};
