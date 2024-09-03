import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './components/Routes';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <section>
          <Routes />
        </section>
      </BrowserRouter>
    );
  }
}

export default App;
