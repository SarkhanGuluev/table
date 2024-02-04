import { FC, startTransition, useEffect } from "react";
import { observer } from "mobx-react-lite";

import MaterialTableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import MaterialTableCell from "@mui/material/TableCell";

import TableCell from "./TableCell";
import { TableStore } from "../store/tableStore";
import { TABLE_COLUMS } from "../constants/table";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";

interface TableBodyProps {
  tableStore: TableStore;
}

const TableBody: FC<TableBodyProps> = observer(({ tableStore }) => {
  const { measureRef, isIntersecting, observer } = useIntersectionObserver();

  useEffect(() => {
    if (isIntersecting && observer) {
      startTransition(() => {
        tableStore.renderByIntersectionObserver();
      });
      observer.disconnect();
    }
  }, [isIntersecting]);

  return (
    <MaterialTableBody>
      {tableStore.rows.map((row, rowIdx) => {
        return (
          <TableRow hover tabIndex={-1} key={row.id}>
            <MaterialTableCell key="idx" align="center">
              {rowIdx + 1}
            </MaterialTableCell>
            {TABLE_COLUMS.map((column) => {
              return (
                <TableCell
                  key={row[column.level].id}
                  levelKey={column.level}
                  rowIdx={rowIdx}
                  selectedOption={row[column.level]}
                  tableStore={tableStore}
                  {...(rowIdx === tableStore.rows.length - 1
                    ? {
                        ref: measureRef,
                      }
                    : {})}
                />
              );
            })}
          </TableRow>
        );
      })}
    </MaterialTableBody>
  );
});

export default TableBody;
