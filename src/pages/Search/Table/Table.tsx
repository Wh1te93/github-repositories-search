import { ChangeEvent, forwardRef, MouseEvent } from "react";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { RepositoryData } from "types";

import { EnhancedTableHeadProps, EnhancedTableProps, headCells } from "./types";

function EnhancedTableHead({
  order,
  orderBy,
  onRequestSort,
}: EnhancedTableHeadProps) {
  const createSortHandler =
    (property: string) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead sx={{ position: "sticky", top: 0, backgroundColor: "#fff" }}>
      <TableRow>
        {headCells.map((headCell, index) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
            align={headCell.sortEnabled ? "right" : "left"}
            sx={{ paddingLeft: index === 0 ? 0 : undefined }}
          >
            {headCell.sortEnabled ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
                sx={{ width: "100%", justifyContent: "flex-end" }}
              >
                {headCell.label}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const EnhancedTable = forwardRef(
  (
    {
      items,
      selectedItem,
      setSelectedItem,
      rowsPerPage,
      setRowsPerPage,
      totalCount,
      page,
      setPage,
      orderBy,
      setOrderBy,
      order,
      setOrder,
      loading,
    }: EnhancedTableProps,
    ref,
  ) => {
    const handleRequestSort = (
      event: MouseEvent<unknown>,
      property: string,
    ) => {
      const isAsc = orderBy === property && order === "asc";
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(property);
    };

    const handleClick = (event: MouseEvent<unknown>, item: RepositoryData) => {
      setSelectedItem(item);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const isSelected = (id: number) => selectedItem?.id === id;

    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          overflow: "auto",
        }}
      >
        <TableContainer
          sx={{ position: "relative", minHeight: "400px" }}
          component={Box}
          ref={ref}
        >
          {loading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                width: "100%",
                height: "100%",
              }}
            >
              <CircularProgress size={140} />
            </Box>
          )}
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <colgroup>
              <col width="26%" />
              <col width="20%" />
              <col width="18%" />
              <col width="16%" />
              <col width="20%" />
            </colgroup>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={items.length}
            />
            <TableBody>
              {items.map((row: RepositoryData, index: number) => {
                const isItemSelected = isSelected(row.id);

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{ paddingLeft: 0 }}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell>{row.language}</TableCell>
                    <TableCell sx={{ paddingLeft: "42px" }}>
                      {row.forks_count}
                    </TableCell>
                    <TableCell sx={{ paddingLeft: "42px" }}>
                      {row.stargazers_count}
                    </TableCell>
                    <TableCell sx={{ paddingLeft: "42px" }}>
                      {row.updated_at}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ marginTop: "auto", flexShrink: 0 }}
        />
      </Box>
    );
  },
);

export default EnhancedTable;
