import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from '../components/Header/';
import Home from '../components/Home/';
import Login from '../components/Login/';
import News from '../components/News/';
import Profile from '../components/Profile/';
import '../App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="ph3 pv1 background-gray mt-4 container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/news" component={News} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </div>
      </div>
    );
  }
}


export default App;