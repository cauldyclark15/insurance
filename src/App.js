import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { Route, Switch, Link } from 'react-router-dom';

import Eligibility from './Eligibility';
import Claims from './Claims';
import Plans from './Plans';
import InsurancePrices from './InsurancePrices';
import './App.css';
import 'antd/dist/antd.css';

const { Header, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <Layout className='layout' style={{ height: '100%' }}>
        <Header>
          <div className='logo' />
          <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['pokitdok']} style={{ lineHeight: '64px' }}>
            <Menu.Item key='pokitdok'>PokitDok</Menu.Item>
            <Menu.Item key='apexedi'>Apex EDI</Menu.Item>
          </Menu>
        </Header>
        <div className='demo'>
          <div className='demo-nav'>
            <Link to='/'>Eligibility</Link>
            <Link to='/insurance'>Insurance Prices</Link>
            <Link to='/plans'>Plans</Link>
            <Link to='/claims'>Claims</Link>
          </div>
          <Switch>
            <Route path='/' component={Eligibility} exact />
            {/* <Route path='/insurance' component={InsurancePrices} />
            <Route path='/plans' component={Plans} />
            <Route path='/claims' component={Claims} /> */}
          </Switch>
        </div>
        <Footer style={{ textAlign: 'center' }}>POC</Footer>
      </Layout>
    );
  }
}

export default App;
