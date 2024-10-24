import React, { useState, ChangeEvent } from "react";
import "../css/EmployeeList.css";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Employee } from "../types";
import { NavLink } from "react-router-dom";

const EmployeeList: React.FC = () => {
  const [search, setSearch] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Employee;
    direction: "asc" | "desc" | null;
  }>({
    key: "firstName",
    direction: null,
  });

  const employeeList = useSelector((state: RootState) => state.employee.list);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredEmployees = employeeList.filter(
    (employee) =>
      employee.firstName.toLowerCase().includes(search.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(search.toLowerCase())
  );
  const handleSort = (key: keyof Employee) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (sortConfig.direction === null) return 0;
    const aKey = a[sortConfig.key];
    const bKey = b[sortConfig.key];
    if (aKey < bKey) return sortConfig.direction === "asc" ? -1 : 1;
    if (aKey > bKey) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = sortedEmployees.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(employeeList.length / itemsPerPage);

  // Обработчик для смены страниц
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="table-container">
      <h2 className="title">Current Employees</h2>
      <div className="table-bar">
        <select />
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <div>
        <table className="employee-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("firstName")}>First Name</th>
              <th onClick={() => handleSort("lastName")}>Last Name</th>
              <th onClick={() => handleSort("startDate")}>Start Date</th>
              <th onClick={() => handleSort("department")}>Department</th>
              <th onClick={() => handleSort("dateOfBirth")}>Date of Birth</th>
              <th onClick={() => handleSort("street")}>Street</th>
              <th onClick={() => handleSort("city")}>City</th>
              <th onClick={() => handleSort("state")}>State</th>
              <th onClick={() => handleSort("zipCode")}>Zip Code</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.length > 0 ? (
              currentEmployees.map((employee, index) => (
                <tr key={index}>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.startDate}</td>
                  <td>{employee.department}</td>
                  <td>{employee.dateOfBirth}</td>
                  <td>{employee.street}</td>
                  <td>{employee.city}</td>
                  <td>{employee.state}</td>
                  <td>{employee.zipCode}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9}>No data available in table</td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Пагинация */}
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              disabled={currentPage === i + 1}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <NavLink to="/" className="back-link">
        Home
      </NavLink>
    </div>
  );
};

export default EmployeeList;
