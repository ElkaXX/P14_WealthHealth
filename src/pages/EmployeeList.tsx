import React, { useState, ChangeEvent } from "react";
import "../css/EmployeeList.css";

interface Employee {
  firstName: string;
  lastName: string;
  startDate: string;
  department: string;
  dateOfBirth: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

const EmployeeList: React.FC = () => {
  const [employees] = useState<Employee[]>([]);
  const [search, setSearch] = useState<string>("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.firstName.toLowerCase().includes(search.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="table-container">
      <h2 className="title">Current Employees</h2>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleSearchChange}
        className="search-input"
      />
      <table className="employee-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Start Date</th>
            <th>Department</th>
            <th>Date of Birth</th>
            <th>Street</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee, index) => (
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
      <a href="/" className="back-link">
        Home
      </a>
    </div>
  );
};

export default EmployeeList;
