import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Background from "./components/Background";
import HomePage from "./components/HomePage";
import LandingPage from "./components/LandingPage";
import ChatUsers from "./components/chat";
import ErrorPage from "./components/404";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import io from 'socket.io-client'

let socket = io()
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector(state => state.session.user)
  const teams = useSelector(state => state.teams)

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} socket={socket} />
      <Background />
      {isLoaded && (
        <>
        <Switch>
        <Route exact path='/'>
          <LandingPage />
        </Route>
        <Route path='/lists'>
          {user ? <HomePage /> : <Redirect to="/login" />}
          <ChatUsers user={user} teams={teams} socket={socket} />
        </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
        </>
      )}
    </>
  );
}

export default App;
