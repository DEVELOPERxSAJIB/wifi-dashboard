import Layout from "../components/Layout/Layout";
import Dashboard from "../pages/Dashboard/Dashboard";
import AdminGuard from "./AdminGuard";
import PrivateGuard from "./PrivateGuard";

const adminRoutes = [
  {
    element: <Layout />,
    children: [
      {
        element: <PrivateGuard />,
        children: [
          {
            element: <AdminGuard />,
            children: [
              {
                path: "/",
                element: <Dashboard />,
              },
            ],
          },
        ],
      },
    ],
  },
];

export default adminRoutes;
