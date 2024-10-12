import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { useAppSelector } from "hooks";
import { RootState } from "store";

import { changeSearchStr } from "features/searchFilter";

import styles from "./header.module.scss";

export const Header = () => {
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
    <header className={styles.header}>
      <div className={styles.searchPanel}>
        <TextField
          placeholder="Введите поисковый запрос"
          variant="outlined"
          size="small"
          onChange={(e) => setSearchStr(e.target.value)}
          value={searchStr}
          className={styles.searchPanelInput}
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
  );
};
