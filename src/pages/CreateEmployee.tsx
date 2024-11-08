import { ChangeEvent, useState } from "react";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { createEmployee } from "../redux/employeeSlice";
import { NavLink } from "react-router-dom";
import "../css/CreateEmployee.css";
import { states } from "../consts/states";
import { openModal } from "../redux/modalSlice";
import { DatePicker } from "datepicker-plugin-wh";

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
}

const CreateEmployee = () => {
  const initialFormState: FormData = {
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    startDate: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    department: "Sales",
  };

  const [formData, setFormData] = useState<FormData>(initialFormState);
  const dispatch: AppDispatch = useDispatch();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (field: string) => (date: string) => {
    setFormData((prevData) => ({ ...prevData, [field]: date }));
  };

  const showModal = () => {
    dispatch(openModal({ title: "Employee created!" }));
  };

  const clearForm = () => setFormData(initialFormState);

  const saveEmployee = () => {
    dispatch(createEmployee(formData));
    clearForm();
    showModal();
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
          value={formData.firstName}
          onChange={handleInputChange}
        />

        <label htmlFor="last-name">Last Name</label>
        <input
          type="text"
          id="last-name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
        />

        <DatePicker
          id="date-of-birth"
          label="Date of Birth"
          value={formData.dateOfBirth}
          onChange={handleDateChange("dateOfBirth")}
        />

        <DatePicker
          id="start-date"
          label="Start Date"
          value={formData.startDate}
          onChange={handleDateChange("startDate")}
        />

        <fieldset className="address">
          <legend>Address</legend>

          <label htmlFor="street">Street</label>
          <input
            type="text"
            id="street"
            name="street"
            value={formData.street}
            onChange={handleInputChange}
          />

          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />

          <label htmlFor="state">State</label>
          <select
            id="state"
            name="state"
            value={formData.state}
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
            value={formData.zipCode}
            onChange={handleInputChange}
          />
        </fieldset>

        <label htmlFor="department">Department</label>
        <select
          id="department"
          name="department"
          value={formData.department}
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
    </div>
  );
};

export default CreateEmployee;
