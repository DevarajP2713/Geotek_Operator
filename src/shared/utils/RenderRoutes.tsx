// utils/renderNestedRoutes.tsx

import React from "react";
import { Route } from "react-router-dom";
import { OperatorRoutesProps } from "../../types/Types";

export const renderNestedRoutes = (
  routes: OperatorRoutesProps[]
): JSX.Element[] => {
  return routes.map((route) => {
    const { routePath, Component, indexRoute, children } = route;

    const element = Component ? <Component /> : undefined;

    if (indexRoute) {
      return <Route key={routePath} index element={element} />;
    }

    return (
      <Route key={routePath} path={routePath} element={element}>
        {children?.length > 0 && renderNestedRoutes(children)}
      </Route>
    );
  });
};
