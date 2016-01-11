import { NumberSpec } from '../spec/numberspec.js';
import React, { PropTypes } from 'react';

export default React.createClass({
  propTypes: {
    numberSpec: PropTypes.instanceOf(NumberSpec).isRequired,
  },
  render() {
    if (this.props.numberSpec) {
      return (
        <h1>{this.props.numberSpec.value}</h1>
      );
    }
    return null;
  },
});
