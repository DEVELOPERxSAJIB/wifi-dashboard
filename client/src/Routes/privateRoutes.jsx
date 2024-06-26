import Layout from "../components/Layout/Layout";
import Customer from "../pages/Customer/Customer";
import Employee from "../pages/Employee/Employee";
import CreateEmployee from "../pages/Employee/CreateEmployee";
import CreateCustomer from "../pages/Customer/CreateCustomer";
import Plans from "../pages/Plans/Plans";
import CreatePlan from "../pages/Plans/CreatePlan";
import UpdatePlan from "../pages/Plans/UpdatePlan";
import Logout from "../pages/auth/Logout";
import PrivateGuard from "./PrivateGuard";
import Settings from "../pages/auth/Settings/Settings";
import Profile from "../pages/Employee/Profile";
import Account from "../pages/Customer/Account";
import NotFound from "../pages/NotFound/NotFound";
import UpdateCustomer from "../pages/Customer/UpdateCustomer";
import MyProfile from "../pages/auth/MyProfile";
import UpdateEmployee from "../pages/Employee/UpdateEmployee";
import PendingEmployee from "../pages/Employee/PendingEmployee";
import Dashboard from "../pages/Dashboard/Dashboard";

export const privateRoutes = [
  {
    element: <Layout />,
    children: [
      {
        element: <PrivateGuard />,
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
          {
            path: "/profile",
            element: <MyProfile />,
          },
          {
            path: "/settings",
            element: <Settings />,
          },
          {
            path: "/employees",
            element: <Employee />,
          },
          {
            path: "/pending-employees",
            element: <PendingEmployee />,
          },
          {
            path: "/employees/update/:id",
            element: <UpdateEmployee />,
          },
          {
            path: "/employees/profile/:id",
            element: <Profile />,
          },
          {
            path: "/create-employee",
            element: <CreateEmployee />,
          },
          {
            path: "/customers",
            element: <Customer />,
          },
          {
            path: "/create-customer",
            element: <CreateCustomer />,
          },
          {
            path: "/customers/account/:id",
            element: <Account />,
          },
          {
            path: "/customers/update-customer/:id",
            element: <UpdateCustomer />,
          },
          {
            path: "/packages",
            element: <Plans />,
          },
          {
            path: "/create-plan",
            element: <CreatePlan />,
          },
          {
            path: "/update-plan/:id",
            element: <UpdatePlan />,
          },
          {
            path: "/logout",
            element: <Logout />,
          },
        ],
      },
    ],
  },
  {
    path: "/*",
    element: <NotFound />,
  },
];
