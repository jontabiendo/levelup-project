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
import ErrorPage from "./components/404";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const dispatch = useDispatch();
  const history = useHistory()
  const [isLoaded, setIsLoaded] = useState(false);
  // const user = useSelector(state => state.session.user)

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
    // if (user) history.push('/lists')
  }, [dispatch]);

  // {user ? (<Redirect to="/lists" />) : (<Redirect to='/' />)}

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {/* <Background /> */}
      {isLoaded && (
        <>
        <Switch>
        <Route exact path='/'>
          <LandingPage />
        </Route>
        <Route path='/lists'>
          <HomePage />
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
