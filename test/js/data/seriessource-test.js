import { Map, List } from 'immutable';
import { rowSource } from './rowsource.js';
import { seriesSource } from './seriessource.js';
const test = require('blue-tape');

test('series data source correctly parsing data', (t) => {
  const testData = List.of(
    Map({'col 1': 'data 1', 'col 2': 'data 2', 'col 3': 'data 3'}),
    Map({'col 1': 'data 4', 'col 2': 'data 5', 'col 3': 'data 6'})
  );
  const rows = rowSource(testData);
  const cols = rows.then((data) => seriesSource(data));
  return cols.then((data) => {
    t.equal(data.size, 3);
    t.equal(data.get('col 1').size, 2);
    t.equal(data.get('col 1').get(0).x, 0);
    t.equal(data.get('col 1').get(1).x, 1);
    t.equal(data.get('col 1').get(0).y, 'data 1');
    t.equal(data.get('col 1').get(1).y, 'data 4');
    t.equal(data.get('col 2').get(0).x, 0);
    t.equal(data.get('col 2').get(1).x, 1);
    t.equal(data.get('col 2').get(0).y, 'data 2');
    t.equal(data.get('col 2').get(1).y, 'data 5');
    t.equal(data.get('col 3').get(0).x, 0);
    t.equal(data.get('col 3').get(1).x, 1);
    t.equal(data.get('col 3').get(0).y, 'data 3');
    t.equal(data.get('col 3').get(1).y, 'data 6');
  });
});
