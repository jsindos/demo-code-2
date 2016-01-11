import React, { PropTypes } from 'react';
import { BulletChartSpec } from '../spec/bulletchartspec.js';
import d3 from 'd3';
import nvd3 from 'nvd3';

export default React.createClass({
  propTypes: {
    bulletChartSpec: PropTypes.instanceOf(BulletChartSpec).isRequired,
  },
  componentWillReceiveProps(nextProps) {
    if (this.chart && nextProps.bulletChartSpec) {
      this.renderGraph(this.chart, nextProps.bulletChartSpec);
    }
  },
  shouldComponentUpdate(nextProps) {
    return !nextProps.bulletChartSpec;
  },
  addGraph(bulletChartSpec) {
    const chart = nvd3.models.bulletChart();
    chart.margin({'top': 3, 'bottom': 3, 'left': 3, 'right': 3});
    chart.height(25);
    chart.tickFormat(() => null);
    this.renderGraph(chart, bulletChartSpec);
    return chart;
  },
  renderGraph(chart, bulletChartSpec) {
    d3.select(this.chartRef)
      .datum(bulletChartSpec)
      .call(chart);
    nvd3.utils.windowResize(chart.update);
  },
  render() {
    if (this.props.bulletChartSpec) {
      return (
        <svg style={{overflow: 'visible'}}
             ref={(chartRef) => {
               this.chartRef = chartRef;
               this.chart = this.addGraph(this.props.bulletChartSpec);
             }} ></svg>
      );
    }
    return null;
  },
});
