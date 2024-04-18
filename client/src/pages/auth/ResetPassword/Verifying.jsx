import { useNavigate, useParams } from "react-router-dom";
import "../../styleSheet/styleSheet.css";
import { Hourglass } from "react-loader-spinner";
import { useEffect } from "react";

const Verifying = () => {
  const params = useParams();
  const navigate = useNavigate();

  setTimeout(() => {}, 1000);
  useEffect(() => {
    if (params.token) {
      const timer = setTimeout(() => {
        navigate(`/reset-password/${params.token}`);
      }, 1000 * 5);

      return () => clearTimeout(timer);
    }
  }, [navigate, params.token]);

  return (
    <>
      <div className="verify-loader">
        <div className="loader-1">
          <h4>
            We are verifying your request. Please do not exit from this page.
          </h4>
        </div>

        <div className="loader-2">
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#7367F0", "#7367F0"]}
          />
        </div>
      </div>
    </>
  );
};

export default Verifying;
