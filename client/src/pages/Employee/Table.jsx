import { useEffect } from "react";
import DataTable from "react-data-table-component";
import styled from "styled-components";
import { getAllEmployees } from "../../features/employee/employeeApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEmployee } from "../../features/employee/employeeSlice";

const CustomDataTable = styled(DataTable)`
  .rdt_TableCell,
  .rdt_TableCol {
    font-size: 16px;
  }
`;

const Table = () => {
  const dispatch = useDispatch();

  const { employees } = useSelector(fetchAllEmployee);
  console.log(employees);

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Year",
      selector: (row) => row.year,
    },
  ];

  const data = [
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
  ];

  useEffect(() => {
    dispatch(getAllEmployees());
  }, [dispatch]);

  return <CustomDataTable columns={columns} data={data} />;
};

export default Table;
