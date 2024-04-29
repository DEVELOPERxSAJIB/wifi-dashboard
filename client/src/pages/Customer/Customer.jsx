import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { IoTrash } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { FaFileExport } from "react-icons/fa6";
import {
  deleteCustomer,
  getAllCustomer,
} from "../../features/customer/customerApiSlice";
import {
  gettingAllCustomers,
  setMessageEmpty,
} from "../../features/customer/customerSlice";
import MainLoader from "../../utils/Loaders/MainLoader";
import Swal from "sweetalert2";
import { alertMessage } from "../../utils/Alerts/alertMessage";
import PageTitle from "../../components/PageTitle/PageTitle";

const CustomDataTable = styled(DataTable)`
  .rdt_TableCell {
    font-size: 15px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .rdt_TableCol {
    font-size: 16px;
    font-weight: bold;
  }
`;

const Customer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    customers = [],
    loader,
    message,
    error,
  } = useSelector(gettingAllCustomers);

  const columns = [
    {
      name: "Employee Id",
      selector: (row) => row._id,
      minWidth: "280px",
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Image",
      selector: (row) => (
        <img
          style={{
            borderRadius: "5px",
            objectFit: "cover",
            height: "60px",
            width: "60px",
          }}
          src={
            row.image.url !== null
              ? row.image.url
              : "https://static.vecteezy.com/system/resources/thumbnails/022/876/359/small_2x/social-media-user-3d-cartoon-illustration-speech-bubble-with-internet-icon-png.png"
          }
          alt="user-avatar"
        />
      ),
    },
    {
      name: "Phone",
      selector: (row) => row.mobile,
    },
    {
      name: "Remark",
      selector: (row) =>
        row.remark ? <span className="text-info">{row.remark}</span> : null,
    },
    {
      name: "Package",
      selector: (row) => (row.package ? row?.package?.name : null),
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <div className="d-flex justify-content-center gap-1">
            <span
              className="badge rounded-pill bg-success cursor-pointer bg-glow"
              onClick={() => navigate(`/customers/account/${row?._id}`)}
            >
              <FaRegEye />
            </span>
            <span
              onClick={() => navigate(`/customers/update-customer/${row?._id}`)}
              className="badge rounded-pill bg-warning cursor-pointer bg-glow"
            >
              <FiEdit />
            </span>
            <span
              onClick={() => handleDeleteCustomer(row?._id)}
              className="badge rounded-pill bg-danger cursor-pointer bg-glow"
            >
              <IoTrash />
            </span>
          </div>
        </>
      ),
    },
  ];

  // delete customer
  const handleDeleteCustomer = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#685DD8",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCustomer(id));
      }
    });
  };

  const [selectedRows, setSelectedRows] = useState([]);
  const handleRowSelected = (rows) => {
    setSelectedRows(rows.selectedRows);
  };

  const handleDeleteRow = () => {
    console.log("Deleting all selected rows:", selectedRows);
  };

  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch(getAllCustomer());
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(customers);
  }, [customers]);

  useEffect(() => {
    const result =
      customers &&
      customers?.filter((data) => {
        const searchLowerCase = search?.toLowerCase();
        return (
          data.name?.toLowerCase().includes(searchLowerCase) ||
          data.mobile?.toLowerCase().includes(searchLowerCase) ||
          data.remark?.toLowerCase().includes(searchLowerCase) ||
          data._id?.toLowerCase().includes(searchLowerCase)
        );
      });

    setFilteredData(result);
  }, [customers, search]);

  useEffect(() => {
    if (message) {
      alertMessage({ type: "success", message: message });
      dispatch(setMessageEmpty());
    }
    if (error) {
      alertMessage({ type: "error", message: error });
      dispatch(setMessageEmpty());
    }
  }, [dispatch, error, message]);

  return (
    <>
    <PageTitle title={"My Customers"} />
      {loader ? (
        <MainLoader />
      ) : (
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="row g-4 mb-4">
            <div className="d-flex justify-content-between">
              <h4 className="ms-1">
                <span className="text-muted fw-light"></span> All Customers
              </h4>
              <Link to={"/create-customer"}>
                <div className="btn btn-secondary add-new btn-primary waves-effect waves-light">
                  <span>
                    <i className="ti ti-plus me-0 me-sm-1 ti-xs" />
                    <span className="d-none d-sm-inline-block">
                      Add Customer
                    </span>
                  </span>
                </div>
              </Link>
            </div>
          </div>
          <CustomDataTable
            columns={columns}
            data={filteredData}
            striped
            pagination
            highlightOnHover
            selectableRows
            selectableRowsHighlight
            onSelectedRowsChange={handleRowSelected}
            subHeader
            subHeaderComponent={
              <>
                <input
                  type="text"
                  placeholder="Search here . . ."
                  className="form-control w-25"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                {selectedRows.length > 0 && (
                  <button className="btn btn-primary mx-2">
                    <FaFileExport />
                  </button>
                )}
                {selectedRows.length > 0 && (
                  <button
                    style={{ background: "red", color: "white" }}
                    className="btn"
                    onClick={handleDeleteRow}
                  >
                    <IoTrash />
                  </button>
                )}
              </>
            }
          />
        </div>
      )}
    </>
  );
};

export default Customer;
