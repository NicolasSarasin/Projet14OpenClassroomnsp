import "./pluginDate.css";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

function PluginDate({ label, selectedDate, onChange }) {
  const [date, setDate] = useState("");
  const [openCalendar, setOpenCalendar] = useState(false);
  const [navMonth, setNavMonth] = useState(0); // Décalage de mois
  const [navYear, setNavYear] = useState(0); // Décalage d’année
  const inputRef = useRef(null);
  const pickerRef = useRef(null);

  // Fermer le calendrier quand on clique ailleurs
  useEffect(() => {
    const handleClickOutsideCalendar = (event) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setOpenCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideCalendar);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideCalendar);
  }, []);

  const handlePrevMonth = () => {
    if (navMonth === 0){
      setNavMonth(11);
      setNavYear(navYear - 1);
    }
    else {
      setNavMonth(navMonth - 1);
    }
  };
  const handleNextMonth = () => {
    if (navMonth === 11){
      setNavMonth(0);
      setNavYear(navYear + 1);
    }
    else {
      setNavMonth(navMonth + 1);
    }
  }

  const displayedDate = new Date(navYear, navMonth, 1);
  const month = displayedDate.toLocaleString("default", { month: "long" });
  const theFirstDay = new Date(navYear, navMonth, 1).getDay();
  const daysInTheMonth = new Date(navYear, navMonth + 1, 0).getDate();

  // === Sélection d’une date ===
  const handleChange = (day) => {
    const formattedDate = `${String(navMonth + 1).padStart(2, "0")}/${String(
      day
    ).padStart(2, "0")}/${navYear}`;
    setDate(formattedDate);
    setOpenCalendar(false);
    if (onChange) onChange(formattedDate);
  };

  return (
    <div className="plugin-date-component">
      <label htmlFor="custom-date">{label}</label>
      <input
        id="custom-date"
        ref={inputRef}
        className="start-date date-of-birth"
        selected={selectedDate}
        value={date}
        placeholder="MM/DD/YYYY"
        readOnly
        onClick={() => setOpenCalendar(!openCalendar)}
      />

      {openCalendar && (
        <div className="datepicker active" id="datepicker" ref={pickerRef}>
          <table className="tableDate">
            <thead className="MonthAndDays">
              <tr className="Month">
                <th colSpan="7">
                  <FontAwesomeIcon
                    icon={faAngleLeft}
                    className="iconNavMonth"
                    onClick={handlePrevMonth}
                    role="button"
                    aria-label="Previous month"
                  />
                  <span className="currentMonthYear">
                    {month.charAt(0).toUpperCase() + month.slice(1)}
                  </span>
                  <select name="Year" id="Year" className="selectedYear" value={navYear} onChange={(e) => setNavYear(Number(e.target.value))}>
                    {Array.from({ length: 101 }, (_, i) => 1950 + i).map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    className="iconNavMonth"
                    onClick={handleNextMonth}
                    role="button"
                    aria-label="Next month"
                  />
                </th>
              </tr>
              <tr className="Days">
                <th>Su</th>
                <th>Mo</th>
                <th>Tu</th>
                <th>We</th>
                <th>Th</th>
                <th>Fr</th>
                <th>Sa</th>
              </tr>
            </thead>
            <tbody className="Dates">
              {Array.from({ length: Math.ceil((daysInTheMonth + theFirstDay) / 7) }).map((_, weekIndex) => (
                <tr key={weekIndex}>
                  {Array(7)
                    .fill(0)
                    .map((_, dayIndex) => {
                      const day = weekIndex * 7 + dayIndex - theFirstDay + 1;
                      const isValidDay = day > 0 && day <= daysInTheMonth;
                      const formattedDate = isValidDay
                        ? `${String(navMonth + 1).padStart(2, "0")}/${String(day).padStart(2, "0")}/${navYear}`
                        : "";
                      const isSelectedDay = formattedDate === date;
                      return (
                        <td
                          key={dayIndex}
                          className={day > 0 && day <= daysInTheMonth ? `SelectedDay  ${isSelectedDay ? "theSelectedDay" : ""}` : "SelectedDay selected"}
                          onClick={() => isValidDay && handleChange(day) }
                        >
                          {isValidDay ? day : "" ? day : ""}
                        </td>
                      );
                    })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PluginDate;
