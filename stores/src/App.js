import React from 'react';
import useRoutes from './routes';
import {BrowserRouter as Router} from "react-router-dom";
import 'materialize-css';
import {Navbar} from './components/Navbar'

function App() {
    const route = useRoutes(true);
  return (
      <Router>
          <Navbar/>
          <div>
              {route}
          </div>
      </Router>
  );
}

export default App;
