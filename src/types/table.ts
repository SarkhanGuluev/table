export type Cell = {
  id: string;
  value: string | null;
};

export type Row = {
  id: string;
} & Record<string, Cell>;
