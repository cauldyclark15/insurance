import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

const PrettyJson = (data, loading, isPokit) => {
  let child = <div>No data to display</div>;

  if (loading) {
    child = <div>Loading...</div>;
  }

  if (!isPokit) {
    child = <h3>Waiting for ApexEDI response</h3>;
  }

  if (data) {
    child = <pre>{JSON.stringify(data, null, 4)}</pre>;
  }

  return <Content style={{ padding: '0 50px' }}>{child}</Content>;
};

export default PrettyJson;
