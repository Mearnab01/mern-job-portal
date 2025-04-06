import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
//component
import Navbar from "./components/Navbar";
import Auth from "./components/auth/Auth";
//pages
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Notification from "./pages/Notification";

const App = () => {
  const Layout = () => {
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  };
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/auth", element: <Auth /> },
        { path: "/", element: <Home /> },
        { path: "/jobs", element: <Jobs /> },
        { path: "/notifications", element: <Notification /> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
};

export default App;
