import "react-datepicker/dist/react-datepicker.css";
import "../../../css/pluginDate.css"
import { useState } from 'react';
function PluginDate({ label, selectedDate, onChange }) {
    const [date, setDate] = useState("");
    const formatDate = (isoDate) => {
        if (!isoDate) return "";
        const [year, month, day] = isoDate.split("-");
        return `${month}/${day}/${year}`;
    };
    const handleChange = (e) => {
        const isoDate = e.target.value; // format YYYY-MM-DD
        setDate(isoDate);
        if (onChange) onChange(isoDate);
    };
    return (
        <div>
            <label htmlFor="start-date date-of-birth">{label}</label>
            <input type="date"
                pattern="^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/[0-9]{4}$"
                id="start-date date-of-birth" 
                className="start-date date-of-birth"
                selected={selectedDate}
                value={date}  
                placeholder="MM/DD/YYYY" 
                onChange={handleChange}
            />
            {formatDate(date)}
        </div>
    )
}

export default PluginDate