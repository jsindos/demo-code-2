import { Point } from '../data/seriessource.js';
import { seriesChartSpec, SeriesAnnotation } from './serieschartspec.js';
import { Map, List } from 'immutable';
const test = require('tape');

test('seriesChartSpec with annotations', (t) => {
  const testData = Map({
    'col 1': List.of(new Point(0, 'data 1'), new Point(1, 'data 2'), new Point(2, 'data 3')),
    'col 2': List.of(new Point(0, 'data 4'), new Point(1, 'data 5'), new Point(2, 'data 6')),
  });
  const seriesAnnotations = (cols) => {
    const annots = [];
    const filteredCols = cols.filter((v, k) => {
      return k !== 'col 2';
    });
    filteredCols.keySeq().forEach((k) => {
      annots.push(new SeriesAnnotation(k, k, 'red'));
    });
    return annots;
  };
  const series = seriesChartSpec('the title', testData, seriesAnnotations);

  t.equal(series.title, 'the title');
  t.equal(series.data.series[0].key, 'col 1', 'first series name');
  t.equal(series.data.series[0].color, 'red', 'first series color');
  t.equal(series.data.series[0].values[0].y, 'data 1', 'first column first data point');
  t.end();
});
