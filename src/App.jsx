import { useRef, useEffect, useState} from 'react'
import { Link } from "react-router-dom";
import PluginDate from './Components/PluginComponent/Plugin_date';

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
  const [form, setForm] = useState({
    firstName:'',
    lastName:'',
    startDate:'',
    department:'',
    dateOfBirth:'',
    street:'',
    city:'',
    state:'',
    zipCode:''
  })

  const [startDate, setStartDate] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const[confirmation, setConfirmation] = useState (false)

  useEffect(() => {
    document.title = "HRnet"; // Changer le titre ici
  }, []);

  function handleChange(e) {
    const { id , value } = e.target ;
    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  const modal = useRef<HTMLDialogElement | null>(null)

  useEffect(() => {
    if (modal.current) {
      modal.current.focus(); // Exemple : focus auto
    }
  }, []);

  function saveEmployee(){
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    employees.push(form)
    localStorage.setItem('employees', JSON.stringify(employees))
    setConfirmation(true);
    if (modal.current) modal.current.showModal();
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
          <input type="text" id="first-name" value={form.firstName} onChange={handleChange}/>

          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" value={form.lastName} onChange={handleChange}/>

          <PluginDate label="Date of Birth" selectedDate={dateOfBirth} onChange={setDateOfBirth}/>

          <PluginDate label="Start Date" selectedDate={startDate} onChange={setStartDate}/>

          <fieldset className="address">
            <legend>Address</legend>

            <label htmlFor="street">Street</label>
            <input id="street" type="text" value={form.street} onChange={handleChange}/>

            <label htmlFor="city">City</label>
            <input id="city" type="text" value={form.city} onChange={handleChange}/>

            <label htmlFor="state">State</label>
            <select name="state" id="state" className='state' value={form.state} onChange={handleChange}>
              {states.map((s) => (
                <option key={s.abbreviation} value={s.abbreviation}>
                  {s.name}
                </option>
              ))}
            </select>

            <label htmlFor="zip-code">Zip Code</label>
            <input id="zip-code" type="number" value={form.zipCode} onChange={handleChange}/>
          </fieldset>

          <label htmlFor="department">Department</label>
          <select name="department" id="department" className='department' value={form.department} onChange={handleChange}>
              <option>Sales</option>
              <option>Marketing</option>
              <option>Engineering</option>
              <option>Human Resources</option>
              <option>Legal</option>
          </select>
        </form>

        <button type="button" onClick={saveEmployee} className='saveButton' id='saveButton'>Save</button>
      </div>
      {confirmation && <dialog className="modal" id='modal' ref={modal}>Employee Created!<button onClick={closeModal} id='closeButton'>Close</button></dialog>}
    </div>
  )
}

export default App
