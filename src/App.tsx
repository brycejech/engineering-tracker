import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Navigation } from './components';
import { Sites, Engineers, Engineer, Site } from './pages';
import './App.scss';

function App(): JSX.Element {
  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route exact path="/" component={Sites} />
        <Route exact path="/sites/:id" component={Site} />
        <Route exact path="/engineers" component={Engineers} />
        <Route exact path="/engineers/:id" component={Engineer} />
      </Switch>
    </div>
  );
}

export default App;
