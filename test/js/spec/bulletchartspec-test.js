import { bulletChartSpec } from './bulletchartspec.js';
import { Point } from '../data/seriessource.js';
import { Map, List } from 'immutable';
const test = require('tape');

test('bulletChartSpec', (t) => {
  const testData = Map({
    'col 1': List.of(new Point(0, 'data 1'), new Point(1, 'data 2'), new Point(2, 'data 3')),
    'col 2': List.of(new Point(0, 'data 4'), new Point(1, 'data 5'), new Point(2, 'data 6')),
  });
  const bullet = bulletChartSpec('title', testData, 'col 1');

  t.deepEqual(bullet.measures[0], 'data 1', 'bullet has measure');
  t.deepEqual(bullet.title, 'title', 'bullet has title');
  t.end();
});
