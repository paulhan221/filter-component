export type Query = {
  column: string;
  operator: string;
  value: string;
};

export type ColumnType = 'string' | 'number' | 'boolean' | 'date';

export type Column<T extends ColumnType> = {
  name: string;
  type: T;
};

export type QueryFilterInputProps = {
  columns: Column<ColumnType>[];
  onQueryChange: (queries: Query[]) => void;
};

export type Operators = {
  [key in ColumnType]: string[];
};
