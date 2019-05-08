import React from 'react';

import Header from './Components/Header';
import Layout from './Components/Layout';

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <React.Fragment>
          <Header />
          <Layout />
      </React.Fragment>
    );
  }
}