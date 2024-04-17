import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getLoggedInUser,
  setMessageEmpty,
} from "../../features/auth/authSlice";
import { useEffect } from "react";
import { logoutUser } from "../../features/auth/authApiSlice";
import { alertMessage } from "../../utils/Alerts/alertMessage";
import AuthLoader from "../../utils/Loaders/AuthLoader";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated, message, error, loader } =
    useSelector(getLoggedInUser);

  useEffect(() => {
    dispatch(logoutUser());
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!isAuthenticated && !user) {
      navigate("/login");
    }

    if (message) {
      alertMessage({ type: "success", message: message });
      dispatch(setMessageEmpty());
    }

    if (error) {
      alertMessage({ type: "error", message: error });
      dispatch(setMessageEmpty());
    }
  }, [dispatch, error, isAuthenticated, message, navigate, user]);

  return <>
    {loader && <AuthLoader />}
  </>;
};

export default Logout;
