import React from "react";
import { LocalStorage } from "enums/LocalStorage";
import { Routes } from "enums/Routes";
import { Route, RouteProps, useHistory } from "react-router-dom";

export const PrivateRoute: React.FC<RouteProps> = ({ children, ...props }) => {
  const history = useHistory();

  if (!localStorage.getItem(LocalStorage.X_TOKEN)) history.push(Routes.LOGIN);

  return <Route {...props}>{children}</Route>;
};

export default PrivateRoute;
