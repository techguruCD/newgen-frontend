import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root";
import Login from "./routes/Login";
import AuthProvider from "./util/AuthContext";
import ProtectedRoute from "./util/ProtectedRoute";
import Register from "./routes/Register";
import Home from "./routes/Home";
import Trade from "./routes/Trade";
import Portfolio from "./routes/Portfolio/Portfolio";
import WatchList from "./routes/Watchlist";
import Logout from "./routes/Logout";
import Dashboard from "./routes/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/trade",
        element: (
          <ProtectedRoute>
            <Trade />
          </ProtectedRoute>
        ),
      },
      {
        path: "/portfolio",
        element: (
          <ProtectedRoute>
            <Portfolio />
          </ProtectedRoute>
        ),
      },
      {
        path: "/watchlists",
        element: (
          <ProtectedRoute>
            <WatchList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/logout",
        element: <Logout />,
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
