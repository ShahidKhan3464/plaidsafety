import { publicRoutes } from "./public";
import { protectedRoutes } from "./protected";

const routes = [
  ...publicRoutes,
  ...protectedRoutes,
  {
    path: "*",
    layout: null,
    permission: [],
    name: "Not Found",
    component: () => <h2>Page not found!</h2>,
  },
];

export default routes;