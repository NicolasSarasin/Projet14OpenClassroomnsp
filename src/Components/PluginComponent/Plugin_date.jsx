import "react-datepicker/dist/react-datepicker.css";
import "../../css/pluginDate.css"
import DatePicker from "react-datepicker";
function PluginDate({ label, selectedDate, onChange }) {
    return (
        <div>
            <label htmlFor="start-date date-of-birth">{label}</label>
            <DatePicker id="start-date date-of-birth" 
                className="start-date date-of-birth" 
                calendarClassName="start-date_calendar date-of-birth_calendar"
                selected={selectedDate}
                dateFormat="MM-dd-yyyy"  
                placeholder="MM-DD-YYYY" 
                onChange={onChange}
            />
        </div>
    )
}

export default PluginDate