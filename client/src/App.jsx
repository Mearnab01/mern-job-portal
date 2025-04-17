import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
//component
import Navbar from "./components/Navbar";
import Auth from "./components/auth/Auth";
//pages
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Notification from "./pages/Notification";
import JobDetails from "./pages/JobDetails";
import Profile from "./pages/Profile";
import Companies from "./components/admin/Companies";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import Applicants from "./components/admin/Applicants";
import PostJob from "./components/admin/PostJob";
import SuggestedJobs from "./components/SuggestedJobs";
import CompanyCreate from "./components/admin/CompanyCreate";

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
        { path: "/my-profile", element: <Profile /> },
        { path: "/details", element: <SuggestedJobs /> },
        { path: "/details/:id", element: <JobDetails /> },

        // ✅ Admin routes (no ProtectedRoute yet)
        { path: "/admin/companies", element: <Companies /> },
        { path: "/admin/companies/create", element: <CompanyCreate /> },
        { path: "/admin/companies/:id", element: <CompanySetup /> },
        { path: "/admin/jobs", element: <AdminJobs /> },
        { path: "/admin/jobs/create", element: <PostJob /> },
        { path: "/admin/jobs/:id/applicants", element: <Applicants /> },
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
