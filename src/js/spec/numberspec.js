/* @flow */

import { Series } from '../data/seriessource.js';

export function NumberSpec(title: string, value: ?number) {
  this.value = value;
  this.title = title;
}

export function numberSpec(title: string,
                             cols: ?Series,
                             colName: string): NumberSpec {
  if (cols && cols.size > 0) {
    const value = cols.get(colName).get(0).y;
    return new NumberSpec(title, value);
  }
  return new NumberSpec(title, null);
}
