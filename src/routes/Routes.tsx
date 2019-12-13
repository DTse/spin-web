import React, { FC } from "react";
import { Route, Switch } from "react-router-dom";

import NotFound from "pages/NotFound";
import { routing } from "./routing";

/**
 * Return the user image located in the assets folder.
 * @param {object} props
 * @return {any} routes
 **/

const Routes: FC = () => {
  const synth = routing.map((route, index) => (
    <Route
      key={index}
      exact={route.exact}
      path={route.path}
      component={route.component}
    />
  ));

  return (
    <Switch>
      {synth}
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
