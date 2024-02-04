import { FC } from "react";
import { observer } from "mobx-react-lite";

import Paper from "@mui/material/Paper";
import MaterialTable from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";

import TableHead from "./TableHead";
import TableBody from "./TableBody";
import TableFooter from "./TableFooter";
import { TableStore } from "../store/tableStore";

interface TableProps {
  tableStore: TableStore;
}

const Table: FC<TableProps> = observer(({ tableStore }) => {
  return (
    <Paper sx={{ position: "relative", width: "100%", height: "100vh" }}>
      <TableContainer sx={{ height: "calc(100% - 74px)" }}>
        <MaterialTable stickyHeader>
          <TableHead />
          <TableBody tableStore={tableStore} />
        </MaterialTable>
      </TableContainer>
      <TableFooter tableStore={tableStore} />
    </Paper>
  );
});

export default Table;
