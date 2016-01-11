/* @flow */

import { List, Map } from 'immutable';
import { Rows } from './rowsource.js';

export function Point(x: number, y: any) {
  this.x = x;
  this.y = y;
}

export type Series = Map<string, List<Point>>;
export type SeriesPromise = Promise<Series>;

export function seriesSource(dataSource: Rows): SeriesPromise {
  let series = Map(); // seriesKey -> values

  let i = 0;
  dataSource.forEach((row) => {
    row.forEach((v, k) => {
      const point = new Point(i, v);
      const newValues = series.get(k) ? series.get(k).push(point) : List.of(point);
      series = series.set(k, newValues);
    });
    i += 1;
  });

  return Promise.resolve(series);
}
