import { ChangeEvent, useState } from "react";
import "../css/CreateEmployee.css";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { createEmployee } from "../redux/employeeSlice";
import { NavLink } from "react-router-dom";
import { states } from "../consts/states";

interface FormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  startDate: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  department: string;
  isModalOpen: boolean;
}

const CreateEmployee = () => {
  const initialFormState = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    startDate: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    department: "Sales",
    isModalOpen: false,
  };
  const [
    {
      firstName,
      lastName,
      dateOfBirth,
      startDate,
      state,
      street,
      city,
      zipCode,
      department,
      isModalOpen,
    },
    setFormData,
  ] = useState<FormData>(initialFormState);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleModal = () => {
    setFormData((prevData) => ({
      ...prevData,
      isModalOpen: !prevData.isModalOpen,
    }));
  };

  const dispatch: AppDispatch = useDispatch();

  const clearForm = () => setFormData(initialFormState);

  const saveEmployee = () => {
    const employeeData = {
      firstName,
      lastName,
      dateOfBirth,
      startDate,
      street,
      city,
      state,
      zipCode,
      department,
    };
    dispatch(createEmployee(employeeData));
    clearForm();
    toggleModal();
  };

  return (
    <div className="container">
      <header className="title">
        <h1>HRnet</h1>
      </header>
      <NavLink to="/employee-list">View Current Employees</NavLink>
      <h2>Create Employee</h2>
      <form id="create-employee" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="first-name">First Name</label>
        <input
          type="text"
          id="first-name"
          name="firstName"
          value={firstName}
          onChange={handleInputChange}
        />

        <label htmlFor="last-name">Last Name</label>
        <input
          type="text"
          id="last-name"
          name="lastName"
          value={lastName}
          onChange={handleInputChange}
        />

        <label htmlFor="date-of-birth">Date of Birth</label>
        <input
          type="date"
          id="date-of-birth"
          name="dateOfBirth"
          value={dateOfBirth}
          onChange={handleInputChange}
        />

        <label htmlFor="start-date">Start Date</label>
        <input
          type="date"
          id="start-date"
          name="startDate"
          value={startDate}
          onChange={handleInputChange}
        />

        <fieldset className="address">
          <legend>Address</legend>

          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            name="street"
            value={street}
            onChange={handleInputChange}
          />

          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={city}
            onChange={handleInputChange}
          />

          <label htmlFor="state">State</label>
          <select
            id="state"
            name="state"
            value={state}
            onChange={handleInputChange}
          >
            <option value="">Select State</option>
            {states.map((st) => (
              <option key={st.abbreviation} value={st.name}>
                {st.name}
              </option>
            ))}
          </select>

          <label htmlFor="zip-code">Zip Code</label>
          <input
            type="number"
            id="zip-code"
            name="zipCode"
            value={zipCode}
            onChange={handleInputChange}
          />
        </fieldset>

        <label htmlFor="department">Department</label>
        <select
          id="department"
          name="department"
          value={department}
          onChange={handleInputChange}
        >
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="Engineering">Engineering</option>
          <option value="Human Resources">Human Resources</option>
          <option value="Legal">Legal</option>
        </select>
      </form>

      <button onClick={saveEmployee}>Save</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Employee Created!</h2>
            <button onClick={() => toggleModal()}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateEmployee;
