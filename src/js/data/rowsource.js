/* @flow */

import { List, Map, Seq } from 'immutable';

export type Row = Map<string, any>;
export type Rows = List<Row>;
export type RowsPromise = Promise<Rows>;

export function rowSource(rows: Rows): RowsPromise {
  return Promise.resolve(rows);
}

// Utilities
export function filterColumns(filter: (value: any) => bool, ...columns: Array<string>): (row: Row) => bool {
  return (row) => {
    return Seq(columns).every((column) => filter(row.get(column)));
  };
}

export function updateColumns(replace: (value: any) => any, ...columns: Array<string>): (row: Row) => Row {
  return (row) => {
    return Seq(columns).reduce((newRow, column) => {
      return newRow.set(column, replace(row.get(column)));
    }, row);
  };
}

export function sortByColumn(column: string): (rowA: Row, rowB: Row) => number {
  return (rowA, rowB) => {
    const a = rowA.get(column);
    const b = rowB.get(column);
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    }
    return 0;
  };
}

export function stringToBool(str: string): bool {
  return str.toLowerCase() === 'true' || str === '1' || str.toLowerCase() === 'yes';
}

export function stringToDate(str: string): Date {
  const dateParts = str.split('/');
  return new Date(Number(dateParts[2]),
                  (Number(dateParts[1]) - 1),
                  Number(dateParts[0]));
}

export function stringToNumber(str: string): number {
  return Number(str.replace(/[^0-9\.]+/g, ''));
}
