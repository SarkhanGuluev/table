import MaterialTableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

import { TableStore } from "../store/tableStore";
import { observer } from "mobx-react-lite";
import Select from "./Select";
import { FC, forwardRef, useState } from "react";
import { Cell } from "../types/table";

interface TableCellProps {
  tableStore: TableStore;
  selectedOption: Cell;
  levelKey: string;
  rowIdx: number;
}

const TableCell = observer(
  ({ selectedOption, tableStore, levelKey, rowIdx }: TableCellProps, ref) => {
    const [isEditMode, setIsEditMode] = useState(false);
    return (
      <MaterialTableCell align="center">
        <Box
          ref={ref}
          sx={{
            width: "240px",
            height: "74px",
            display: "flex",
            gap: "16px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isEditMode ? (
            <Select
              tableStore={tableStore}
              levelKey={levelKey}
              rowIdx={rowIdx}
              selectedOption={selectedOption}
            />
          ) : (
            <Typography variant="h5" component="h5">
              {selectedOption.value}
            </Typography>
          )}
          <IconButton onClick={() => setIsEditMode((prev) => !prev)}>
            {isEditMode ? <CloseIcon /> : <ModeEditIcon />}
          </IconButton>
        </Box>
      </MaterialTableCell>
    );
  },
  { forwardRef: true }
);

export default TableCell;
