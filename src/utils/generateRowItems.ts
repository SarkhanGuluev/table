import { v4 } from "uuid";
import { Row, Cell } from "../types/table";
import { LEVELS_KEYS } from "../constants/levels";

const createCell = (): Cell => ({
  id: v4(),
  value: null,
});

export const generateRow = () =>
  ({
    id: v4(),
    [LEVELS_KEYS.level1]: createCell(),
    [LEVELS_KEYS.level2]: createCell(),
    [LEVELS_KEYS.level3]: createCell(),
    [LEVELS_KEYS.level4]: createCell(),
    [LEVELS_KEYS.level5]: createCell(),
  } as Row);

export const generateRowsNTimes = (n: number): Array<Row> =>
  Array.from({ length: n }, generateRow);
