import Dashboard from "pages/Dashboard";
import { RouteProps } from "react-router";

const routing: RouteProps[] = [
  {
    exact: true,
    path: "/",
    component: Dashboard
  }
];

export { routing };
