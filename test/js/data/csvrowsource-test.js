import csvRowSource from './csvrowsource.js';
import fs from 'fs';
const test = require('blue-tape');

const CSV_WITH_HEADER = './test/resources/rowdatasource/csv-with-header.csv';
const CSV_WITH_WHITE_SPACE = './test/resources/rowdatasource/csv-with-whitespace.csv';

function readFile(path) {
  return new Promise((then) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        throw err;
      }
      then(data);
    });
  });
}

test('csvRowSource should load csv body when headers are present', (t) => {
  const csv = readFile(CSV_WITH_HEADER).then((file) => csvRowSource(file, true, false));

  return csv.then((data) => {
    t.equal(data.size, 2);
    t.equal(data.get(0).size, 3);
    t.equal(data.get(1).size, 3);

    t.equal(data.get(0).get('col 1'), 'data 1');
    t.equal(data.get(0).get('col 2'), 'data 2');
    t.equal(data.get(0).get('col 3'), 'data 3');
    t.equal(data.get(1).get('col 1'), 'data 4');
    t.equal(data.get(1).get('col 2'), 'data 5');
    t.equal(data.get(1).get('col 3'), 'data 6');
  });
});

test('csvRowSource should trim whitespace in data', (t) => {
  const csv = readFile(CSV_WITH_WHITE_SPACE).then((file) => csvRowSource(file, true, false));
  return csv.then((data) => {
    t.equal(data.get(0).get('col 1'), 'data 1');
    t.equal(data.get(0).get('col 2'), 'data 2');
    t.equal(data.get(0).get('col 3'), 'data 3');
  });
});

test('csvRowSource should throw error if file missing', (t) => {
  return csvRowSource({}, true, false).then((data) => {
    t.fail('expected exception ' + data);
  }).catch((e) => {
    // this message is arbitrary
    t.equal(e.message, 'FileReaderSync is not defined');
  });
});
