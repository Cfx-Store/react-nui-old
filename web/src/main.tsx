import "./styles/globals.css";

import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { Providers } from "./components/providers.tsx";
import Layout from "./app/layout.tsx";
import Index from "./app/index.tsx";
import { cn, isBrowser } from "./lib/utils.ts";

import {
  RootRoute,
  RouterProvider,
  Router,
  Route,
  Outlet,
} from "@tanstack/react-router";
import Players from "./app/players.tsx";

const rootRoute = new RootRoute({
  component: Root,
});

const routeTree = rootRoute.addChildren([
  new Route({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Index,
  }),
  new Route({
    getParentRoute: () => rootRoute,
    path: "/players",
    component: Players,
  }),
]);

const router = new Router({ routeTree });

function Root() {
  return (
    <Providers>
      <div
        className={cn(
          "h-full w-full",
          isBrowser() &&
            "bg-[url('https://forum.cfx.re/uploads/default/5d811d13c320e5e2323aea587f2eb4802d28f705')] bg-cover",
        )}
      >
        <Layout>
          <Outlet />
        </Layout>
      </div>
    </Providers>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
