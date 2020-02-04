import React from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import DoomRoom from './views/doomRoom/DoomRoom';
import Home from './views/home/Home';
import {DoomguyProvider} from './DoomguyContext'
import Logo from './views/Logo';

function App() {
  return (
    <BrowserRouter>
      <DoomguyProvider>
        <div className="App">
          <Logo/>
          <Switch>
            <Route path="/doomroom" component={DoomRoom}/>
            <Route path="/" component={Home} exact/>
          </Switch>
        </div>
      </DoomguyProvider>
    </BrowserRouter>
  );
}

export default App;
