import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import DoomRoom from './views/doomRoom/DoomRoom';
import Home from './views/home/Home';
import {DoomguyProvider} from './DoomguyContext'
import Logo from './views/Logo';
import Create from './views/create/Create';

function App() {
  return (
    <BrowserRouter>
      <DoomguyProvider>
        <div className="App">
          <Logo/>
          <Switch>
            <Route path="/doomroom" component={DoomRoom}/>
            <Route path="/create" component={Create}/>
            <Route path="/" component={Home}/>
          </Switch>
        </div>
      </DoomguyProvider>
    </BrowserRouter>
  );
}

export default App;
