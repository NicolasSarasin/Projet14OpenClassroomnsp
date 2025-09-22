import { useEffect, useRef, useState} from 'react'
import { Link } from "react-router-dom";
import PluginDate from './Components/PluginComponent/Plugin_date'; 
import { format } from "date-fns";

const states = [
  { name: "Alabama", abbreviation: "AL" },
  { name: "Alaska", abbreviation: "AK" },
  { name: "Arizona", abbreviation: "AZ" },
  { name: "Arkansas", abbreviation: "AR" },
  { name: "California", abbreviation: "CA" },
  { name: "Colorado", abbreviation: "CO" },
  { name: "Connecticut", abbreviation: "CT" },
  { name: "Delaware", abbreviation: "DE" },
  { name: "Florida", abbreviation: "FL" },
  { name: "Georgia", abbreviation: "GA" },
  { name: "Hawaii", abbreviation: "HI" },
  { name: "Idaho", abbreviation: "ID" },
  { name: "Illinois", abbreviation: "IL" },
  { name: "Indiana", abbreviation: "IN" },
  { name: "Iowa", abbreviation: "IA" },
  { name: "Kansas", abbreviation: "KS" },
  { name: "Kentucky", abbreviation: "KY" },
  { name: "Louisiana", abbreviation: "LA" },
  { name: "Maine", abbreviation: "ME" },
  { name: "Maryland", abbreviation: "MD" },
  { name: "Massachusetts", abbreviation: "MA" },
  { name: "Michigan", abbreviation: "MI" },
  { name: "Minnesota", abbreviation: "MN" },
  { name: "Mississippi", abbreviation: "MS" },
  { name: "Missouri", abbreviation: "MO" },
  { name: "Montana", abbreviation: "MT" },
  { name: "Nebraska", abbreviation: "NE" },
  { name: "Nevada", abbreviation: "NV" },
  { name: "New Hampshire", abbreviation: "NH" },
  { name: "New Jersey", abbreviation: "NJ" },
  { name: "New Mexico", abbreviation: "NM" },
  { name: "New York", abbreviation: "NY" },
  { name: "North Carolina", abbreviation: "NC" },
  { name: "North Dakota", abbreviation: "ND" },
  { name: "Ohio", abbreviation: "OH" },
  { name: "Oklahoma", abbreviation: "OK" },
  { name: "Oregon", abbreviation: "OR" },
  { name: "Pennsylvania", abbreviation: "PA" },
  { name: "Rhode Island", abbreviation: "RI" },
  { name: "South Carolina", abbreviation: "SC" },
  { name: "South Dakota", abbreviation: "SD" },
  { name: "Tennessee", abbreviation: "TN" },
  { name: "Texas", abbreviation: "TX" },
  { name: "Utah", abbreviation: "UT" },
  { name: "Vermont", abbreviation: "VT" },
  { name: "Virginia", abbreviation: "VA" },
  { name: "Washington", abbreviation: "WA" },
  { name: "West Virginia", abbreviation: "WV" },
  { name: "Wisconsin", abbreviation: "WI" },
  { name: "Wyoming", abbreviation: "WY" },
];

function App() {
  

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [department, setDepartment] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  useEffect(() => {
    document.title = "HRnet"; // Changer le titre ici
  }, []);

  const modal = useRef(null);

  function saveEmployee(){
    const employee = {
      firstName,
      lastName,
      dateOfBirth: dateOfBirth ? format(dateOfBirth, "MM/dd/yyyy") : "",
      startDate: startDate ? format(startDate, "MM/dd/yyyy") : "",
      department,
      street,
      city,
      state,
      zipCode,
    }
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    employees.push(employee);
    localStorage.setItem('employees', JSON.stringify(employees))
    if(modal.current) modal.current.showModal();
    return;
  }

  function closeModal(){
    if (modal.current) modal.current.close();
  }

  return (
    <div className="html body">
      <div className="title">
          <h1>HRnet</h1>
      </div>
      <div className="container">
        <Link to="/employeeList">View Current Employees</Link>
        <h2>Create Employee</h2>
        <form onSubmit={(e) => e.preventDefault()} id="create-employee" className='create-employee'>
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>

          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)}/>

          <PluginDate label="Date of Birth" selectedDate={dateOfBirth} onChange={setDateOfBirth}/>

          <PluginDate label="Start Date" selectedDate={startDate} onChange={setStartDate}/>

          <fieldset className="address">
            <legend>Address</legend>

            <label htmlFor="street">Street</label>
            <input id="street" type="text" value={street} onChange={(e) => setStreet(e.target.value)}/>

            <label htmlFor="city">City</label>
            <input id="city" type="text" value={city} onChange={(e) => setCity(e.target.value)}/>

            <label htmlFor="state">State</label>
            <select name="state" id="state" className='state'value={state} onChange={(e) => setState(e.target.value)}>
              {states.map((s) => (
                <option key={s.abbreviation} value={s.abbreviation}>
                  {s.name}
                </option>
              ))}
            </select>

            <label htmlFor="zip-code">Zip Code</label>
            <input id="zip-code" type="number" value={zipCode} onChange={(e) => setZipCode(e.target.value)}/>
          </fieldset>

          <label htmlFor="department">Department</label>
          <select name="department" id="department" className='department' value={department} onChange={(e) => setDepartment(e.target.value)}>
              <option>Sales</option>
              <option>Marketing</option>
              <option>Engineering</option>
              <option>Human Resources</option>
              <option>Legal</option>
          </select>
        </form>

        <button type="button" onClick={saveEmployee} className='saveButton' id='saveButton'>Save</button>
      </div>
      <dialog className="modal" id='modal' ref={modal}>Employee Created!<button onClick={closeModal} id='closeButton'>Close</button></dialog>
    </div>
  )
}

export default App
