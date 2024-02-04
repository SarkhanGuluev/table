import { makeAutoObservable, toJS } from "mobx";
import { DEFAULT_SELECT_OPTIONS } from "../constants/defaultSelectOptions";
import {
  nextLevelKeyByCurrent,
  previousLevelKeyByCurrent,
} from "../constants/levels";
import { SelectOption, SelectOptions } from "../types/selectOption";
import { Row } from "../types/table";
import { generateRowsNTimes } from "../utils/generateRowItems";

class TableStore {
  rows: Array<Row> = [];
  private rowsNeedToRender: number = 0;
  private rowsToRenderPerIteration: number = 100;
  selectOptions: SelectOptions = [];

  constructor({ selectOptions }: { selectOptions: SelectOptions }) {
    this.selectOptions = selectOptions;
    makeAutoObservable(this);
  }

  private renderRows(n: number) {
    this.rows = [...this.rows, ...generateRowsNTimes(n)];
  }

  addRows(n: number) {
    if (n <= this.rowsToRenderPerIteration) {
      this.renderRows(n);

      return;
    }

    this.rowsNeedToRender =
      this.rowsNeedToRender + n - this.rowsToRenderPerIteration;

    this.renderRows(this.rowsToRenderPerIteration);
  }

  renderByIntersectionObserver() {
    if (!this.rowsNeedToRender) {
      return;
    }

    if (this.rowsNeedToRender <= this.rowsToRenderPerIteration) {
      this.renderRows(this.rowsNeedToRender);

      return;
    }

    this.rowsNeedToRender - this.rowsToRenderPerIteration;

    this.renderRows(this.rowsToRenderPerIteration);
  }

  setRowOption(
    rowIdx: number,
    levelKey: string,
    value: SelectOption["id"] | null
  ) {
    const { id, value: currentValue } = this.rows[rowIdx][levelKey];

    this.rows[rowIdx] = {
      ...this.rows[rowIdx],
      [levelKey]: {
        id,
        value,
      },
    };

    const nextLevelKey = nextLevelKeyByCurrent[levelKey];

    if (nextLevelKey && currentValue) {
      this.setRowOption(rowIdx, nextLevelKey, null);
    }
  }

  save() {
    console.log("Rows: ", toJS(this.rows));
  }

  private getParentId(rowIdx: number, currentLevelKey: string) {
    const row = this.rows[rowIdx];
    const prevLevelKey = previousLevelKeyByCurrent[currentLevelKey];

    let parentId: string | null = null;

    if (prevLevelKey && prevLevelKey in row && row[prevLevelKey]?.value) {
      parentId = row[prevLevelKey].value;
    }

    return parentId;
  }

  getFilteredSelectOptions(
    rowIdx: number,
    currentLevelKey: string,
    searchString?: string
  ) {
    return this.selectOptions.filter((option) => {
      if (option.parentId !== this.getParentId(rowIdx, currentLevelKey)) {
        return false;
      }

      if (
        searchString &&
        option.id.toLowerCase().indexOf(searchString.toLowerCase()) < 0
      ) {
        return false;
      }

      return true;
    });
  }

  addSelectOption(
    rowIdx: number,
    currentLevelKey: string,
    id: string
  ): SelectOption {
    const parentId = this.getParentId(rowIdx, currentLevelKey);

    const newOption = {
      parentId,
      id,
    };

    this.selectOptions.push(newOption);

    return newOption;
  }
}
export { TableStore };

export default new TableStore({
  selectOptions: DEFAULT_SELECT_OPTIONS,
});
