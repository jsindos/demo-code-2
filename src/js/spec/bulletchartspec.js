/* @flow */

import { Series } from '../data/seriessource.js';

export function BulletChartSpec(title: string,
                                measures: ?Array<number>,
                                yToString: ?(o: any) => string,
                                ranges: Array<number>,
                                markers: Array<number>) {
  this.title = title;
  this.measures = measures;
  this.ranges = ranges;
  this.markers = markers;
  this.yToString = yToString;
}

export function bulletChartSpec(title: string,
                                cols: ?Series,
                                yToString: ?(o: any) => string,
                                colName: string,
                                ranges: Array<number>,
                                markers: Array<number>): BulletChartSpec {
  if (cols && cols.size > 0) {
    const lastElementPosition = cols.get(colName).size - 1;
    const maxValue = cols.get(colName).reduce((max, e) => {
      return max > e.y ? max : e.y;
    }, Number.NEGATIVE_INFINITY);
    const minValue = cols.get(colName).reduce((min, e) => {
      return min < e.y ? min : e.y;
    }, Number.POSITIVE_INFINITY);
    return new BulletChartSpec(
      title,
      [cols.get(colName).get(lastElementPosition).y],
      yToString,
      [minValue, maxValue],
      [minValue * 1.2]
    );
  }
  return new BulletChartSpec(title, null, null, ranges, markers);
}
