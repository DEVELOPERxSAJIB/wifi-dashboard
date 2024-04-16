import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./Routes/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllPlans } from "./features/plan/planApiSlice";
import { ToastContainer } from 'react-toastify';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPlans());
  }, [dispatch]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
