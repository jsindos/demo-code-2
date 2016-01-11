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
    return !nextProps.seriesChartSpec;
  },
  addGraph(seriesChartSpec) {
    const chart = nvd3.models.multiBarHorizontalChart();
    this.renderGraph(chart, seriesChartSpec);
    return chart;
  },
  renderGraph(chart, seriesChartSpec) {
    seriesChartSpec.data.then((data) => {
      chart.xAxis     // Chart x-axis settings
           .axisLabel(data.xLabel)
           .tickFormat(data.xTicks);

      chart.yAxis     // Chart y-axis settings
           .axisLabel(data.yLabel)
           .tickFormat(d3.format('.02f'));
      d3.select(this.chartRef)
        .datum(data.series)
        .call(chart);
      nvd3.utils.windowResize(chart.update);
    });
  },
  render() {
    if (this.props.seriesChartSpec) {
      return (
        <svg style={{overflow: 'visible'}}
             ref={(ref) => {
               this.chartRef = ref;
               this.chart = this.addGraph(this.props.seriesChartSpec);
             }} ></svg>
      );
    }
    return null;
  },
});
