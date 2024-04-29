import { useParams } from "react-router-dom";
import Sidebar from "../../components/Account/Sidebar/Sidebar";
import Tabs from "../../components/Account/Tabs/Tabs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gettingAllCustomers } from "../../features/customer/customerSlice";
import { getAllCustomer } from "../../features/customer/customerApiSlice";
import MainLoader from "../../utils/Loaders/MainLoader";
import PageTitle from "../../components/PageTitle/PageTitle";

const Account = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { customers, loader } = useSelector(gettingAllCustomers);

  const [soloCustomer, setSoloCustomer] = useState();
  useEffect(() => {
    const data = customers?.find((data) => data._id === id);
    setSoloCustomer(data);
  }, [customers, id]);

  useEffect(() => {
    dispatch(getAllCustomer());
  }, [dispatch]);

  return (
    <>
    <PageTitle title={`Customer Profile @${soloCustomer?.name}`} />
      {loader ? (
        <MainLoader />
      ) : (
        <div className="container-xxl flex-grow-1 container-p-y">
          <h4 className="py-2 mb-4">
            <span className="text-muted fw-light">Customer /</span> Account
          </h4>
          <div className="row">
            <Sidebar data={soloCustomer} />

            <div className="col-xl-8 col-lg-7 col-md-7 order-0 order-md-1">
              <Tabs data={soloCustomer?.package} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Account;
