import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import './App.css';
import Blog from './components/Blog/Blog';
import Contact from './components/Contact/Contact';
import Destination from './components/Destination/Destination';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import NotMatched from './components/NotMatched/NotMatched';
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';


export const UserContext = createContext();

function App() {
  const [signedInUser, setSignedInUser] = useState({});
  return (
    <UserContext.Provider value={[signedInUser, setSignedInUser]}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <PrivateRoute path="/destination">
            <Destination />
          </PrivateRoute>
          <Route path="/blog">
            <Blog />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="/signin">
            <SignIn />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="*">
            <NotMatched />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
