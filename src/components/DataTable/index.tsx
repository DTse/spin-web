import React, { FC } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Paper
} from "@material-ui/core";

import { searchRequest } from "services";

import { useDataTableStyles } from "./useDataTableStyles";

interface Data {
  type: Array<string>;
  price: string;
  location: string;
  availability: string;
  sqMeters: string;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  {
    id: "type",
    numeric: false,
    disablePadding: true,
    label: "Type"
  },
  {
    id: "availability",
    numeric: false,
    disablePadding: false,
    label: "Availability"
  },
  { id: "location", numeric: false, disablePadding: false, label: "Location" },
  {
    id: "sqMeters",
    numeric: true,
    disablePadding: false,
    label: "Square Meters"
  },
  { id: "price", numeric: true, disablePadding: false, label: "Price" }
];

const EnhancedTableHead = (): JSX.Element => {
  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? "none" : "default"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

interface IDataTableProps {
  state: any;
  dispatch: any;
}
const DataTable: FC<IDataTableProps> = ({ state, dispatch }) => {
  const classes = useDataTableStyles();

  const { entries, pagination, query } = state;

  const handleChangePage = (event: unknown, newPage: number) => {
    searchRequest({ ...query, page: newPage + 1 }).then((res: any) => {
      if (res.status === "success") {
        dispatch({ type: "setEntries", value: [...res.entries] });
        dispatch({
          type: "setPagination",
          value: { ...res.pagination }
        });
      }
    });
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead />
            <TableBody>
              {entries.map((row: Data, index: number) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow hover tabIndex={-1} key={row.type + "-" + index}>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      align="center"
                    >
                      {row.type.join()}
                    </TableCell>
                    <TableCell align="center">{row.availability}</TableCell>
                    <TableCell align="center">{row.location}</TableCell>
                    <TableCell align="center">{row.sqMeters}</TableCell>
                    <TableCell align="center">{row.price}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={pagination.total || 0}
          rowsPerPage={pagination.per_page || 5}
          page={pagination.current_page - 1 || 0}
          onChangePage={handleChangePage}
        />
      </Paper>
    </div>
  );
};

export default DataTable;
