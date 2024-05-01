import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import styled from "styled-components";
import {
  deleteEmployee,
  getAllEmployees,
} from "../../features/employee/employeeApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllEmployee, setMessageEmpty } from "../../features/employee/employeeSlice";
import { FaRegEye } from "react-icons/fa";
import { IoTrash } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { FaFileExport } from "react-icons/fa6";
import MainLoader from "../../utils/Loaders/MainLoader";
import { getLoggedInUser } from "../../features/auth/authSlice";
import Swal from "sweetalert2";
import { alertMessage } from "../../utils/Alerts/alertMessage";

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

const Table = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { employees, loader, message, error } = useSelector(fetchAllEmployee);
  const { user } = useSelector(getLoggedInUser);

  const activateEmployee = employees.filter((data) => data.isActivate === true);

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
      name: "Remark",
      selector: (row) =>
        row.remark ? <span className="text-success">{row.remark}</span> : null,
    },
    {
      name: "Role",
      selector: (row) => (
        <span
          className={`badge text-capitalize ${
            row.role === "admin" ? "bg-primary" : "bg-dark"
          }`}
        >
          {row?.role}
        </span>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <div className="d-flex justify-content-center gap-1">
            <span
              className="badge rounded-pill bg-success cursor-pointer bg-glow"
              onClick={() => navigate(`/employees/profile/${row._id}`)}
            >
              <FaRegEye />
            </span>
            <span
              onClick={() => navigate(`/employees/update/${row._id}`)}
              className="badge rounded-pill bg-warning cursor-pointer bg-glow"
            >
              <FiEdit />
            </span>
            <span
              onClick={() => handleDeleteUser(row._id)}
              className="badge rounded-pill bg-danger cursor-pointer bg-glow"
            >
              <IoTrash />
            </span>
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

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#685DD8",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete user!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteEmployee(id));
      }
    });
  };

  const [search, setSearch] = useState("");
  const [filteredEmployee, setFilteredEmployee] = useState([]);

  useEffect(() => {
    dispatch(getAllEmployees(user?.role));
  }, [dispatch, user]);

  useEffect(() => {
    setFilteredEmployee(activateEmployee);
  }, [employees]);

  useEffect(() => {
    if (message) {
      alertMessage({ type: "success", message: message });
      dispatch(setMessageEmpty());
      navigate("/employees");
    }
    if (error) {
      alertMessage({ type: "error", message: error });
      dispatch(setMessageEmpty());
    }
  }, [dispatch, error, message, navigate]);

  useEffect(() => {
    const result = activateEmployee.filter((data) => {
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
      {loader ? (
        <MainLoader />
      ) : (
        <>
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
        </>
      )}
    </>
  );
};

export default Table;
