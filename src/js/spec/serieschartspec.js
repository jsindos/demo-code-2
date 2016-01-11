/* @flow */

import { Point, Series } from '../data/seriessource.js';

export function SeriesAnnotation(label: string, column: string, color: ?string) {
  this.label = label;
  this.column = column;
  this.color = color;
}

export function NVD3Series(key: string, color: ?string, values: Array<Point>) {
  this.key = key;
  this.color = color;
  this.values = values;
}

export type ChartSpecData = {
  series: Array<NVD3Series>,
  xTicks: (i: number) => string,
};

export type ChartSpecDataPromise = Promise<ChartSpecData>;

export function SeriesChartSpec(title: string,
                                data: ?ChartSpecData,
                                yLabel: string,
                                xLabel: string,
                                chartType: string) {
  this.title = title;
  this.data = data;
  this.yLabel = yLabel;
  this.xLabel = xLabel;
  this.chartType = chartType;
}

export function seriesChartSpec(title: string,
                                cols: ?Series,
                                seriesAnnotations: (s: Series) => Array<SeriesAnnotation>,
                                yLabel: string,
                                xLabel: string,
                                xTicksCol: string,
                                xTicksToString: (o: any) => string,
                                yTicksToString: (o: any) => string,
                                chartType: string): SeriesChartSpec {
  if (cols && cols.size > 0) {
    const data = {
      series: seriesAnnotations(cols).map((annot) => {
        const values = cols ? cols.get(annot.column).toArray() : [];
        return new NVD3Series(annot.label ? annot.label : annot.column,
                              annot.color,
                              values);
      }),
      yTicks: yTicksToString ? yTicksToString : (i) => i,
      xTicks: (i) => {
        return cols ? xTicksToString(cols.get(xTicksCol).get(i).y) : '';
      },
    };
    return new SeriesChartSpec(title, data, yLabel, xLabel, chartType);
  }
  return new SeriesChartSpec(title, null, yLabel, xLabel, chartType);
}
