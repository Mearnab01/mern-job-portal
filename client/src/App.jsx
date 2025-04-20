import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
//component
import Navbar from "./components/Navbar";
import Auth from "./components/auth/Auth";
//pages
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Profile from "./pages/Profile";
import Companies from "./components/admin/Companies";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import Applicants from "./components/admin/Applicants";
import PostJob from "./components/admin/PostJob";
import SuggestedJobs from "./components/SuggestedJobs";
import CompanyCreate from "./components/admin/CompanyCreate";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import ProtectedNotification from "./components/ProtectedNotification";

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
        { path: "/notifications", element: <ProtectedNotification /> },
        { path: "/my-profile", element: <Profile /> },
        { path: "/details", element: <SuggestedJobs /> },
        { path: "/details/:id", element: <JobDetails /> },

        // ✅ Admin routes (no ProtectedRoute yet)
        {
          path: "/admin/companies",
          element: (
            <ProtectedRoute>
              <Companies />
            </ProtectedRoute>
          ),
        },
        {
          path: "/admin/companies/create",
          element: (
            <ProtectedRoute>
              <CompanyCreate />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "/admin/companies/:id",
          element: (
            <ProtectedRoute>
              <CompanySetup />
            </ProtectedRoute>
          ),
        },
        {
          path: "/admin/jobs",
          element: (
            <ProtectedRoute>
              <AdminJobs />
            </ProtectedRoute>
          ),
        },
        {
          path: "/admin/jobs/create",
          element: (
            <ProtectedRoute>
              <PostJob />
            </ProtectedRoute>
          ),
        },
        {
          path: "/admin/jobs/:id/applicants",
          element: (
            <ProtectedRoute>
              {" "}
              <Applicants />
            </ProtectedRoute>
          ),
        },
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
