import React, { PropTypes } from 'react';
const HorizontalGraph = require('components/horizontalgraph.js');
// const VerticalGraph = require('components/verticalgraph.js');
const Sparkline = require('components/sparkline.js');
const BulletGraph = require('components/bulletgraph.js');
const Number = require('components/number.js');
import { SeriesChartSpec } from 'spec/serieschartspec.js';
import { BulletChartSpec } from 'spec/bulletchartspec.js';
import { NumberSpec } from 'spec/numberspec.js';

export default React.createClass({
  propTypes: {
    seriesChartSpec: PropTypes.instanceOf(SeriesChartSpec).isRequired,
    bulletChartSpec: PropTypes.instanceOf(BulletChartSpec).isRequired,
    numberSpec: PropTypes.instanceOf(NumberSpec).isRequired,
  },
  render: function render() {
    let horizGraph;
    let bulletGraph;
    let sparkline;
    let number;
    if (this.props.seriesChartSpec.data) {
      horizGraph = <HorizontalGraph seriesChartSpec={this.props.seriesChartSpec}/>;
      bulletGraph = <BulletGraph bulletChartSpec={this.props.bulletChartSpec}/>;
      sparkline = <Sparkline seriesChartSpec={this.props.seriesChartSpec}/>;
      number = <Number numberSpec={this.props.numberSpec}/>;
    } else {
      horizGraph = <p>LOADING</p>;
      bulletGraph = <p>LOADING</p>;
      sparkline = <p>LOADING</p>;
      number = <p>LOADING</p>;
    }
    return (
      <div>
        <div style={{height: '500px', width: '1000px'}}>
          {horizGraph}
        </div>
        <div style={{height: '500px', width: '1000px'}}>
          {bulletGraph}
        </div>
        <div style={{height: '500px', width: '1000px'}}>
          {sparkline}
        </div>
        <div style={{height: '500px', width: '1000px'}}>
          {number}
        </div>
      </div>
    );
  },
});
