import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./Routes/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { getAllPlans } from "./features/plan/planApiSlice";

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllPlans())
  })

  return <>
    <RouterProvider router={router} />
  </>;
}

export default App;
