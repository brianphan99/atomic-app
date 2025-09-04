import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Home from "../pages/Home";
import PublicLayout from "../layouts/PublicLayout";
import ProtectedLayout from "../layouts/ProtectedLayout";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "/login", element: < Login/> },
      { path: "/register", element: < Register/>},
    ],
  },
  {
    element: <ProtectedLayout />,
    children: [
      { path: "/", element: <Home/> },
      // { path: "/profile", element: <Settings /> },
      // { path: "/progress", element: <ProgressPage /> },
      // { path: "/workout/:id", element: <WorkoutPage /> },
    ],
  }
]);