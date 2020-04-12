import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';

import './App.css';

function App(){

    return(
    <div>
      <Router>
        <div className="bg">
        <Route path="/" component={Login}/>        
        <Route path="/Register" component={Register}/>
        </div>
      </Router>
      </div>
    )

}

export default App