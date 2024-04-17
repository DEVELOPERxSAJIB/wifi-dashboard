import Login from "../pages/auth/Login";
import Forgot from "../pages/auth/Forgot";
import PublicGuard from "./PublicGuard";


export const publicRoutes = [

  {
    element: <PublicGuard />,
    children: [
      {
        path: "/forgot-password",
        element: <Forgot />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
];
