import Login from "../pages/auth/Login";
import Forgot from "../pages/auth/Forgot";
import PublicGuard from "./PublicGuard";
import Verifying from "../pages/auth/ResetPassword/Verifying";
import ResetPassword from "../pages/auth/ResetPassword/ResetPassword";


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
      {
        path: "/reset-password/:token",
        element: <ResetPassword />,
      },
      {
        path: "/request-reset-password/:token",
        element: <Verifying />,
      },
    ],
  },
];
