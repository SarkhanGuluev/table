import React, { useState } from "react";
import { computed } from "mobx";
import { observer } from "mobx-react-lite";

import {
  FormControl,
  Select as MaterialSelect,
  MenuItem,
  InputLabel,
  ListSubheader,
  TextField,
  SelectChangeEvent,
  Button,
  Divider,
} from "@mui/material";

import { SelectOption } from "../types/selectOption";
import { TableStore } from "../store/tableStore";
import { Cell } from "../types/table";

interface SelectProps {
  levelKey: string;
  rowIdx: number;
  tableStore: TableStore;
  selectedOption: Cell;
}

const Select: React.FC<SelectProps> = observer(
  ({ levelKey, rowIdx, tableStore, selectedOption }) => {
    const [searchText, setSearchText] = useState("");

    const options = computed(() =>
      tableStore.getFilteredSelectOptions(rowIdx, levelKey, searchText)
    ).get();

    const handleSelect = (e: SelectChangeEvent<SelectOption["id"]>) => {
      if (selectedOption.value !== e.target.value) {
        tableStore.setRowOption(rowIdx, levelKey, e.target.value);
      }
    };

    const handleAddOption = (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      tableStore.addSelectOption(rowIdx, levelKey, searchText);
      setSearchText("");
    };

    return (
      <FormControl fullWidth>
        <InputLabel id="search-select-label">Options</InputLabel>
        <MaterialSelect
          size="small"
          MenuProps={{ autoFocus: false }}
          labelId="search-select-label"
          id="search-select"
          value={selectedOption.value ?? ""}
          label="Поиск"
          onChange={handleSelect}
        >
          <ListSubheader>
            <TextField
              size="small"
              autoFocus
              placeholder="Type to search..."
              fullWidth
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== "Escape") {
                  e.stopPropagation();
                }
              }}
            />
          </ListSubheader>
          <Divider />
          {!options.length && searchText && (
            <MenuItem>
              <Button onClick={handleAddOption}>Добавить</Button>
            </MenuItem>
          )}
          {options.map(({ id }) => (
            <MenuItem key={id} value={id}>
              {id}
            </MenuItem>
          ))}
        </MaterialSelect>
      </FormControl>
    );
  }
);

export default Select;
