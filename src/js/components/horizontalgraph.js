import React, { PropTypes } from 'react';
import { SeriesChartSpecPromise } from '../spec/serieschartspec.js';
import d3 from 'd3';
import nvd3 from 'nvd3';

export default React.createClass({
  propTypes: {
    seriesChartSpec: PropTypes.instanceOf(SeriesChartSpecPromise).isRequired,
  },
  componentWillReceiveProps(nextProps) {
    if (this.chart && nextProps.seriesChartSpec) {
      this.renderGraph(this.chart, nextProps.seriesChartSpec);
    }
  },
  shouldComponentUpdate(nextProps) {
    return !nextProps.series;
  },
  addGraph(seriesChartSpec) {
    let chart;
    switch (seriesChartSpec.chartType) {
    case 'stacked':
      chart = nvd3.models.stackedAreaChart();
      break;
    case 'line':
      chart = nvd3.models.lineChart();
      break;
    default:
      chart = nvd3.models.lineChart();
    }
    const showLegend = seriesChartSpec.data.series.length > 1 ? true : false;
    chart.showLegend(showLegend);
    this.renderGraph(chart, seriesChartSpec);
    return chart;
  },
  renderGraph(chart, seriesChartSpec) {
    const data = seriesChartSpec.data;
    chart.xAxis     // Chart x-axis settings
         .axisLabel(seriesChartSpec.xLabel)
         .tickFormat(data.xTicks);

    chart.yAxis     // Chart y-axis settings
         .axisLabel(seriesChartSpec.yLabel)
         .tickFormat(data.yTicks);
    chart.forceY([0]);
    d3.select(this.chartRef)
      .datum(data.series)
      .call(chart);
    nvd3.utils.windowResize(chart.update);
  },
  render() {
    if (this.props.seriesChartSpec) {
      return (
        <svg style={{overflow: 'visible'}}
             ref={(ref) => {
               this.chartRef = ref;
               this.chart = this.addGraph(this.props.seriesChartSpec);
             }}></svg>
      );
    }
    return null;
  },
});
