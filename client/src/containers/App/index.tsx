import React from "react";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "components/PrivateRoute";
import { Routes } from "enums/Routes";
import LoginSignup from "pages/LoginSignup";
import Home from "pages/Home";

const App = () => {
  return (
    <Switch>
      <Route exact path={Routes.LOGIN}>
        <LoginSignup />
      </Route>
      <PrivateRoute exact path={Routes.HOME}>
        <Home />
      </PrivateRoute>
    </Switch>
  );
};

export default App;
