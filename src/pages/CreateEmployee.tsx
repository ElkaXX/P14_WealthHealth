import { ChangeEvent, useState } from "react";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { createEmployee } from "../redux/employeeSlice";
import { NavLink } from "react-router-dom";
import "../css/CreateEmployee.css";
import { states } from "../consts/states";
import { openModal } from "../redux/modalSlice";
import { DatePicker } from "datepicker-plugin-wh";

// Define structure of employee form data
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
  // Initial empty state for form fields
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

  const [formData, setFormData] = useState<FormData>(initialFormState); // State for form data
  const dispatch: AppDispatch = useDispatch();

  // Handler to update form data when input changes
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handler to update date fields
  const handleDateChange = (field: string) => (date: string) => {
    setFormData((prevData) => ({ ...prevData, [field]: date }));
  };

  // Show confirmation modal
  const showModal = () => {
    dispatch(openModal({ title: "Employee created!" }));
  };

  // Reset form fields to initial state
  const clearForm = () => setFormData(initialFormState);

  // Dispatch action to save employee and reset form on submit
  const saveEmployee = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission behavior
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
      <form id="create-employee" onSubmit={saveEmployee}>
        <label htmlFor="first-name">First Name</label>
        <input
          required
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

        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default CreateEmployee;
