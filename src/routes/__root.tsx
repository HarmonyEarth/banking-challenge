import { createRootRoute, Outlet } from "@tanstack/react-router";
//import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex h-20 place-items-center justify-center gap-2 bg-green-700">
        <h1 className="text-3xl font-bold text-white">Banking Challenge</h1>
      </div>
      <br />
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
});
