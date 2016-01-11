/* @flow */

import { List, Map } from 'immutable';
import Papa from 'papaparse';
import { rowSource, RowsPromise } from './rowsource.js';

export default function csvRowSource(path: string,
                                     hasHeader: bool = true,
                                     remoteSource: bool = true): RowsPromise {
  function parseRows(csv) {
    if (hasHeader) {
      return List(csv.data.map((row) => {
        return Map(csv.meta.fields.map((k) => [k.trim(), row[k].trim()]));
      }));
    }
    return null;
  }

  return new Promise((then) => {
    Papa.parse(path, {
      complete: then,
      download: remoteSource,
      error: (error) => { throw new Error(`Error loading CSV: ${error}`); },
      header: hasHeader,
      skipEmptyLines: true,
    });
  }).then((csv) => {
    return rowSource(parseRows(csv));
  });
}
