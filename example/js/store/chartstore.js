import { combineReducers } from 'redux';
import { Actions } from './actions.js';
import { seriesChartSpec, SeriesAnnotation } from 'spec/serieschartspec.js';
import d3 from 'd3';
import { bulletChartSpec } from 'spec/bulletchartspec.js';
import { numberSpec } from 'spec/numberspec.js';
import { Map } from 'immutable';

function testSeriesSpec(cols) {
  const seriesAnnotations = () => {
    return [
      new SeriesAnnotation('test 1', '1'),
      new SeriesAnnotation('test 2', '2'),
      new SeriesAnnotation('test 3', '3'),
    ];
  };
  return seriesChartSpec('title', cols, seriesAnnotations, '$', 'Date', 'Date', (d) => d.toDateString(), (i) => d3.format('%')(i));
}

function testBulletSpec(cols) {
  return bulletChartSpec('', cols, '1', [2500, 5000], [4000]);
}

function testNumberSpec(cols) {
  return numberSpec('', cols, '1');
}

const DEFAULT_STATE = {
  chartData: {
    seriesChartSpec: testSeriesSpec(Map()),
    bulletChartSpec: testBulletSpec(Map()),
    numberSpec: testNumberSpec(Map()),
  },
};

const DEFAULT_ACTION = { type: 'NOOP' };

function chartData(state = DEFAULT_STATE.chartData, action = DEFAULT_ACTION) {
  switch (action.type) {
  case Actions.CHANGE_DATA:
    return {
      // seriesChartSpec: testSeriesData([2, 3, 4]),
      // bulletChartSpec: testBulletData([2]),
      // numberSpec: testHeadlineData([2]),
    };
  case Actions.RENDER_DATA:
    return {
      seriesChartSpec: testSeriesSpec(action.data),
      bulletChartSpec: testBulletSpec(action.data),
      numberSpec: testNumberSpec(action.data),
    };
  default:
    return state;
  }
}

export default combineReducers({
  chartData,
});
