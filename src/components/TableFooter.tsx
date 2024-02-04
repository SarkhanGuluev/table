import { FC, useState, startTransition, ChangeEvent } from "react";
import { observer } from "mobx-react-lite";

import MaterialTableFooter from "@mui/material/TableFooter";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";

import { TableStore } from "../store/tableStore";

const DEFAULT_ROWS_NUMBER = 10;

interface TableFooterProps {
  tableStore: TableStore;
}

const TableFooter: FC<TableFooterProps> = observer(({ tableStore }) => {
  const [rowsNumber, setRowsNumber] = useState(DEFAULT_ROWS_NUMBER);

  const handleAddRows = () => {
    startTransition(() => {
      tableStore.addRows(rowsNumber);
    });
  };
  const handleSave = () => {
    tableStore.save();
  };

  return (
    <MaterialTableFooter>
      <Box sx={{ margin: "10px 20px", display: "flex", gap: "10px" }}>
        <Input
          type="number"
          placeholder="Введите число..."
          value={rowsNumber}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setRowsNumber(Number(e.target.value))
          }
        />
        <Button variant="outlined" onClick={handleAddRows}>
          Добавить строки
        </Button>
        <Button variant="contained" onClick={handleSave}>
          Сохранить
        </Button>
      </Box>
    </MaterialTableFooter>
  );
});

export default TableFooter;
