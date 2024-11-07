import React, { useState } from "react";
import "../css/DatePicker.css";

interface DatePickerProps {
  id: string;
  label: string;
  value: string;
  onChange: (date: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  id,
  label,
  value,
  onChange,
}) => {
  const [date, setDate] = useState(value);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    onChange(selectedDate); // Retransmettre la date sélectionnée au composant parent
  };

  return (
    <div className="date-picker">
      <label htmlFor={id} className="date-picker-label">
        {label}
      </label>
      <input
        type="date"
        id={id}
        value={date}
        onChange={handleDateChange}
        className="date-picker-input"
      />
    </div>
  );
};

export default DatePicker;
