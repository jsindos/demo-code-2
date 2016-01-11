import React from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { createStore } from 'redux';
import ChartApp from './chartapp.js';
import ChartStore from './store/chartstore.js';
import rowSource from 'data/csvrowsource.js';
import { seriesSource } from 'data/seriessource.js';
import { Seq } from 'immutable';
import { renderData } from './store/actions.js';

const store = createStore(ChartStore);

// setTimeout(function changeDate() {
//   store.dispatch(changeData());
// }, 3000);

function testSeriesData() {
  function stringToMoneyAsNumber(str) {
    return Number(str.replace(/[^0-9\.]+/g, ''));
  }
  function stringToDate(str) {
    return new Date(str);
  }
  function updateColumns(replace, ...columns) {
    return (row) => {
      return Seq(columns).reduce((newRow, column) => {
        return newRow.set(column, replace(row.get(column)));
      }, row);
    };
  }
  const csv = rowSource('data.csv').then((rows) => {
    return rows.map(updateColumns(stringToMoneyAsNumber, '1', '2', '3'))
      .map(updateColumns(stringToDate, 'Date'));
  });
  csv.then((rows) => seriesSource(rows))
    .then((cols) => store.dispatch(renderData(cols)));
}

setTimeout(function getData() {
  testSeriesData();
}, 1000);

function select(state) {
  return {
    seriesChartSpec: state.chartData.seriesChartSpec,
    bulletChartSpec: state.chartData.bulletChartSpec,
    numberSpec: state.chartData.numberSpec,
  };
}

const App = connect(select)(ChartApp);

ReactDom.render(
  <App store={store}/>,
  document.getElementById('app')
);
