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
    const chart = nvd3.models.sparklinePlus();
    chart.margin({'top': 5, 'bottom': 5, 'left': 3, 'right': 3});
    chart.showLastValue(false);
    this.renderGraph(chart, seriesChartSpec);
    return chart;
  },
  renderGraph(chart, seriesChartSpec) {
    chart.xTickFormat(seriesChartSpec.data.xTicks);
    chart.yTickFormat(seriesChartSpec.data.yTicks);
    d3.select(this.chartRef)
      .datum(seriesChartSpec.data.series[0].values)
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
             }} ></svg>
      );
    }
    return null;
  },
});
