import { Suspense } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider as Provider,
} from "react-router-dom";
import routes from "./routes";
import AccessControl from "./accessControl";
import Spinner from "common/spinner/spinner";
import ErrorBoundary from "common/errorBoundary/errorBoundary";

const router = createBrowserRouter(
  createRoutesFromElements(
    routes.map((route) => (
      <Route
        key={route.path}
        element={
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
              <AccessControl
                routePath={route.path}
                routePermission={route.permission}
                isAuthenticatedRoute={route.authenticated}
              />
            </Suspense>
          </ErrorBoundary>
        }
      >
        <Route
          path={route.path}
          element={
            route.layout ? (
              <route.layout>
                <route.component route={route} />
              </route.layout>
            ) : (
              <route.component route={route} />
            )
          }
        />
      </Route>
    )),
  ),
);

export default function RouterProvider() {
  return <Provider router={router} />;
}