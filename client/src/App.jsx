import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./Routes/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllPlans } from "./features/plan/planApiSlice";
import { ToastContainer } from "react-toastify";
import { loggedinUserInfo } from "./features/auth/authApiSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPlans());
  }, [dispatch]);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      dispatch(loggedinUserInfo());
    }
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
