import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import styled from "styled-components";
import { getAllEmployees } from "../../features/employee/employeeApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllEmployee } from "../../features/employee/employeeSlice";
import { FaRegEye } from "react-icons/fa";
import { IoTrash } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { FaFileExport } from "react-icons/fa6";

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

  const { employees } = useSelector(fetchAllEmployee);

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
          style={{ borderRadius: "5px", objectFit: "cover" }}
          height={55}
          width={65}
          src={row.avatar?.url}
          alt="user-avater"
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
        row.remark ? <span className="text-success">{row.remark}</span> : null,
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
          <div className="d-flex justify-content-center gap-1">
            <span
              className="badge rounded-pill bg-success cursor-pointer bg-glow"
              onClick={() => navigate(`/employees/profile/${row._id}`)}
            >
              <FaRegEye />
            </span>
            <span className="badge rounded-pill bg-warning cursor-pointer bg-glow">
              <FiEdit />
            </span>
            <span className="badge rounded-pill bg-danger cursor-pointer bg-glow">
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

  const [search, setSearch] = useState("");
  const [filteredEmployee, setFilteredEmployee] = useState([]);

  useEffect(() => {
    dispatch(getAllEmployees());
  }, [dispatch]);

  useEffect(() => {
    setFilteredEmployee(employees);
  }, [employees]);

  useEffect(() => {
    const result = employees.filter((data) => {
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
  );
};

export default Table;
