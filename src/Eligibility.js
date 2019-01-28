import React, { Component } from 'react';
import PokitDok from 'pokitdok-nodejs';

import Display from './PrettyJson';

class Module extends Component {
  state = { data: null, loading: false };

  async componentDidMount() {}

  render() {
    const { data, loading } = this.state;
    const { isPokit } = this.props;

    return <Display data={data} loading={loading} isPokit={isPokit} />;
  }
}

export default Module;
