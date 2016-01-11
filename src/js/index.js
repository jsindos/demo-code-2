/* @flow */

import csvRowSource from './data/csvrowsource.js';
import { rowSource, Rows, RowsPromise, filterColumns, sortByColumn, stringToBool, stringToDate, stringToNumber, updateColumns} from './data/rowsource.js';
import { seriesSource, Point, Series, SeriesPromise } from './data/seriessource.js';
import { seriesChartSpec, NVD3Series, SeriesAnnotation, SeriesChartSpec } from './spec/serieschartspec.js';
import { bulletChartSpec, BulletChartSpec } from './spec/bulletchartspec.js';
import HorizontalGraph from './components/horizontalgraph.js';
import VerticalGraph from './components/verticalgraph.js';
import Sparkline from './components/sparkline.js';
import BulletGraph from './components/bulletgraph.js';

export const RowSource = {
  csvRowSource: csvRowSource,
  rowSource: rowSource,
  Rows: Rows,
  RowsPromise: RowsPromise,
  Utilities: {
    filterColumns: filterColumns,
    sortByColumn: sortByColumn,
    stringToBool: stringToBool,
    stringToDate: stringToDate,
    stringToNumber: stringToNumber,
    updateColumns: updateColumns,
  },
};

export const SeriesSource = {
  seriesSource: seriesSource,
  Point: Point,
  Series: Series,
  SeriesPromise: SeriesPromise,
};

export const ChartSpec = {
  NVD3Series: NVD3Series,
  Series: {
    chartSpec: seriesChartSpec,
    Annotation: SeriesAnnotation,
    ChartSpec: SeriesChartSpec,
    bulletSpec: bulletChartSpec,
    BulletSpec: BulletChartSpec,
  },
};

export const Components = {
  HorizontalGraph: HorizontalGraph,
  VerticalGraph: VerticalGraph,
  Sparkline: Sparkline,
  BulletGraph: BulletGraph,
};
