import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import styled from "styled-components";
import {
  activeEmployee,
  getAllEmployees,
} from "../../features/employee/employeeApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchAllEmployee,
  setMessageEmpty,
} from "../../features/employee/employeeSlice";
import { IoTrash } from "react-icons/io5";
import { FaFileExport } from "react-icons/fa6";
import MainLoader from "../../utils/Loaders/MainLoader";
import { FaUserCheck } from "react-icons/fa6";
import Swal from "sweetalert2";
import { alertMessage } from "../../utils/Alerts/alertMessage";
import { timeAgo } from "../../helper/timeAgoFun";
import PageTitle from "../../components/PageTitle/PageTitle";
import { getLoggedInUser } from "../../features/auth/authSlice";

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

const PendingEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { employees, loader, message, error } = useSelector(fetchAllEmployee);
  const { user } = useSelector(getLoggedInUser);

  const pendingEmployee = employees.filter((data) => data.isActivate === false);

  const columns = [
    {
      name: "Name",
      cell: (row) => (
        <>
          <span
            className="added-by cursor-pointer"
            onClick={() => navigate(`/employees/profile/${row._id}`)}
          >
            {row.name}
          </span>
        </>
      ),
      sortable: true,
    },
    {
      name: "Image",
      selector: (row) => {
        return row?.avatar?.url !== null ? (
          <img
            style={{ borderRadius: "5px", objectFit: "cover" }}
            height={55}
            width={65}
            src={row.avatar?.url}
            alt="user-avater"
          />
        ) : (
          <img
            style={{
              borderRadius: "5px",
              objectFit: "cover",
              border: "1px solid #efefef",
            }}
            height={"fill"}
            width={65}
            src="https://static.vecteezy.com/system/resources/previews/007/069/364/original/3d-user-icon-in-a-minimalistic-style-user-symbol-for-your-website-design-logo-app-ui-vector.jpg"
            alt="user-avater"
          />
        );
      },
    },
    {
      name: "Phone",
      selector: (row) => row.mobile,
    },
    {
      name: "Created At",
      selector: (row) => timeAgo(row.createdAt),
    },
    {
      name: "Added By",
      selector: (row) => (
        <Link to={`/employees/profile/${row?.addedBy?._id}`}>
          <span className="added-by">
            {row?.addedBy ? row.addedBy?.name : null}
          </span>
        </Link>
      ),
    },
    {
      name: "Role",
      selector: (row) => (
        <span className="badge bg-primary">
          {row.isAdmin ? "Admin" : "User"}
        </span>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <div className="d-flex gap-1">
            <span className="badge rounded-pill bg-danger cursor-pointer bg-glow">
              <IoTrash />
            </span>
            <abbr title="Approve Staff">
              <span
                onClick={() => handleActiveUser(row)}
                className="badge rounded-pill bg-info cursor-pointer bg-glow"
              >
                <FaUserCheck />
              </span>
            </abbr>
          </div>
        </>
      ),
    },
  ];

  const [selectedRows, setSelectedRows] = useState([]);
  const handleRowSelected = (rows) => {
    setSelectedRows(rows.selectedRows);
  };

  const handleDeleteRow = () => {
    // Implement delete logic for all selected rows
    console.log("Deleting all selected rows:", selectedRows);
    // Here, you would dispatch an action to delete the selected rows
    // For simplicity, I'm just logging the selected rows
  };

  // Activate User
  const handleActiveUser = (row) => {
    const data = {
      id: row._id,
      active: !row.isActivate,
    };

    Swal.fire({
      title: "Are you sure?",
      text: "Enabling this grants staff access to the software.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#0DCAF0",
      cancelButtonColor: "#d33",
      confirmButtonText: "Activate Now !",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(activeEmployee(data));
      }
    });
  };

  const [search, setSearch] = useState("");
  const [filteredEmployee, setFilteredEmployee] = useState([]);

  useEffect(() => {
    dispatch(getAllEmployees(user?.role));
  }, [dispatch, user]);

  useEffect(() => {
    setFilteredEmployee(pendingEmployee);
  }, [employees]);

  useEffect(() => {
    if (message) {
      alertMessage({ type: "info", message: message });
      dispatch(setMessageEmpty());
    }
    if (error) {
      alertMessage({ type: "error", message: message });
      dispatch(setMessageEmpty());
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    const result = pendingEmployee.filter((data) => {
      const searchToLowerCase = search.toLowerCase();
      return (
        data.name.toLowerCase().includes(searchToLowerCase) ||
        data._id.toLowerCase().includes(searchToLowerCase) ||
        data.remark?.toLowerCase().includes(searchToLowerCase) ||
        data.mobile.toLowerCase().includes(searchToLowerCase) ||
        data.email.toLowerCase().includes(searchToLowerCase) ||
        data.address?.city.toLowerCase().includes(searchToLowerCase)
      );
    });

    setFilteredEmployee(result);
  }, [employees, search]);

  return (
    <>
      <PageTitle title={"Pending Employees"} />
      {loader ? (
        <MainLoader />
      ) : (
        <>
          <div className="container-xxl flex-grow-1 container-p-y">
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="py-3 mb-2">
                <span className="text-muted fw-light">Employees / </span>Pending
              </h4>
              <Link to={"/create-employee"}>
                <div
                  className="btn btn-secondary add-new btn-primary waves-effect waves-light"
                  tabIndex={0}
                  aria-controls="DataTables_Table_0"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasAddUser"
                >
                  <span>
                    <i className="ti ti-plus me-0 me-sm-1 ti-xs" />
                    <span className="d-none d-sm-inline-block">
                      Add Employee
                    </span>
                  </span>
                </div>
              </Link>
            </div>
            <div className="d-flex justify-content-end py-3"></div>
            <CustomDataTable
              columns={columns}
              data={filteredEmployee}
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
        </>
      )}
    </>
  );
};

export default PendingEmployee;
