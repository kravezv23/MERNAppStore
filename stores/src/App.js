import React from 'react';
import useRoutes from './routes';
import {BrowserRouter as Router} from "react-router-dom";
import 'materialize-css';

function App() {
    const route = useRoutes(true);
  return (
      <Router>
          <div>
              {route}
          </div>
      </Router>
  );
}

export default App;
