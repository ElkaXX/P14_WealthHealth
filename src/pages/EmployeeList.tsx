import React, { useState, ChangeEvent } from "react";
import "../css/EmployeeList.css";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Employee } from "../types";
import { NavLink } from "react-router-dom";

// Component to display a searchable, sortable, and paginated list of employees
const EmployeeList: React.FC = () => {
  const [search, setSearch] = useState<string>(""); // Search term for filtering employees
  const [currentPage, setCurrentPage] = useState<number>(1); // Current page in pagination
  const [itemsPerPage, setItemsPerPage] = useState<number>(10); // Items displayed per page
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Employee;
    direction: "asc" | "desc" | null;
  }>({
    key: "firstName", // Default sort by first name
    direction: null,
  });

  const employeeList = useSelector((state: RootState) => state.employee.list); // Retrieve employee list from Redux store

  // Update search term based on user input
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // Filter employees by search term
  const filteredEmployees = employeeList.filter(
    (employee) =>
      employee.firstName.toLowerCase().includes(search.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(search.toLowerCase()),
  );

  // Handle sorting by column, toggling between ascending and descending
  const handleSort = (key: keyof Employee) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Display sorting arrows, indicating current sort direction
  const getSorting = (key: string) => (
    <div>
      <div
        style={{
          color:
            sortConfig.direction === "asc" && sortConfig.key === key
              ? "red"
              : "inherit",
        }}
      >
        ⇧
      </div>
      <div
        style={{
          color:
            sortConfig.direction === "desc" && sortConfig.key === key
              ? "red"
              : "inherit",
        }}
      >
        ⇩
      </div>
    </div>
  );

  // Sort employees by selected column and direction
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (sortConfig.direction === null) return 0;
    const aKey = a[sortConfig.key];
    const bKey = b[sortConfig.key];
    if (aKey < bKey) return sortConfig.direction === "asc" ? -1 : 1;
    if (aKey > bKey) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Calculate pagination indices
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = sortedEmployees.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(employeeList.length / itemsPerPage);

  // Update current page for pagination
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Update number of items displayed per page
  const handleItemsPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  return (
    <div className="table-container">
      <h1 className="title">Current Employees</h1>
      <div className="table-bar">
        <div className="entries">
          <label htmlFor="itemsPerPage">Show</label>
          <select
            id="itemsPerPage"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="entries-select"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span>entries</span>
        </div>

        <div>
          <label htmlFor="search-input" className="visually-hidden">
            Search Employees
          </label>
          <input
            type="text"
            id="search-input"
            placeholder="Search..."
            value={search}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
      </div>

      <main>
        <table className="employee-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("firstName")}>
                <div className="header-cell">
                  First Name {getSorting("firstName")}
                </div>
              </th>
              <th onClick={() => handleSort("lastName")}>
                <div className="header-cell">
                  Last Name {getSorting("lastName")}
                </div>
              </th>
              <th onClick={() => handleSort("startDate")}>
                <div className="header-cell">
                  Start Date {getSorting("startDate")}
                </div>
              </th>
              <th onClick={() => handleSort("department")}>
                <div className="header-cell">
                  Department {getSorting("department")}
                </div>
              </th>
              <th onClick={() => handleSort("dateOfBirth")}>
                <div className="header-cell">
                  Date of Birth {getSorting("dateOfBirth")}
                </div>
              </th>
              <th onClick={() => handleSort("street")}>
                <div className="header-cell">Street {getSorting("street")}</div>
              </th>
              <th onClick={() => handleSort("city")}>
                <div className="header-cell">City {getSorting("city")}</div>
              </th>
              <th onClick={() => handleSort("state")}>
                <div className="header-cell">State {getSorting("state")}</div>
              </th>
              <th onClick={() => handleSort("zipCode")}>
                <div className="header-cell">
                  Zip Code {getSorting("zipCode")}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Display current page of employees */}
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

        {/* Pagination controls */}
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
      </main>

      <NavLink to="/" className="back-link">
        Home
      </NavLink>
    </div>
  );
};

export default EmployeeList;
