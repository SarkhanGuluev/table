import { FC } from "react";
import { observer } from "mobx-react-lite";

import TableCell from "@mui/material/TableCell";
import MaterialTableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { TABLE_COLUMS } from "../constants/table";

const TableHead: FC = observer(() => {
  return (
    <MaterialTableHead>
      <TableRow>
        <TableCell key="idx"></TableCell>
        {TABLE_COLUMS.map((column) => (
          <TableCell key={column.level} align="center">
            {column.title}
          </TableCell>
        ))}
      </TableRow>
    </MaterialTableHead>
  );
});

export default TableHead;
