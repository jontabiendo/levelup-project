import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Background from "./components/Background";
import HomePage from "./components/HomePage";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function App() {
  const dispatch = useDispatch();
  const history = useHistory()
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector(state => state.session.user)
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
    if (user) history.push('/lists')
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      <Background />
      {isLoaded && (
        <>
        <Route path='/lists'>
          <HomePage />
        </Route>
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
        </>
      )}
    </>
  );
}

export default App;
