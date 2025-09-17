import { useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import '../../css/app.css'
//import "https://cdn.datatables.net/1.10.21/css/jquery.dataTables.min.css"
import "../Employee-list/employee-list.js"

function EmployeeList() {
  const [employeesList, setEmployeesList] = useState([]);
  const [search, setSearch] = useState();
  useEffect(() => {
    document.title = "HRnet - Current Employees"; // Changer le titre ici
    const employees = JSON.parse(localStorage.getItem("employees") || "[]");
    setEmployeesList(Array.isArray(employees) ? employees : []);
  }, []);
  //const dataTable = document.getElementById('employee-table');

  const filterEmployees = employeesList.filter((emp) =>
    Object.values(emp).join(" ").toLowerCase().includes((search || "").toLowerCase())
  );
  
  return (
      <div id="employee-div" className="container">
        <h1>Current Employees</h1>
        <div id='employee-table-filter' className='dataTables_Wrapper no-footer'>
          <div className='divHeader'>
            <div id='employee-table_length' className='dataTables_length'>
              <label>Show
                <select htmlFor='employee-table_length' aria-controls='employee-table' className='select_employee-table'>
                  <option value='10'>10</option>
                  <option value='25'>25</option>
                  <option value='50'>50</option>
                  <option value='100'>100</option>
                </select> 
                entries
              </label>
            </div>
            <div id='employee-table_filter' className='dataTables_filter'>
              <label>Search: 
                <input type="search" 
                className='search_employee-table' 
                id='search_employee-table' 
                aria-controls='employee-table' 
                value={search || ""} 
                onChange={(e) => setSearch(e.target.value)}/>
              </label>
            </div>
          </div>
          <table id="employee-table" className="display dataTable no-footer" role='grid' aria-describedby='employee-table_info'>
            <thead>
              <tr role='row'>
                <th className='sorting' tabIndex="0" aria-controls='employee-table' rowSpan={"1"} colSpan={"1"} style={{width:"76.8594px"}}>First Name</th>
                <th className='sorting' tabIndex="0" aria-controls='employee-table' rowSpan={"1"} colSpan={"1"} style={{width:"74.2188px"}}>Last Name</th>
                <th className='sorting' tabIndex="0" aria-controls='employee-table' rowSpan={"1"} colSpan={"1"} style={{width:"70.6406px"}}>Start Date</th>
                <th className='sorting' tabIndex="0" aria-controls='employee-table' rowSpan={"1"} colSpan={"1"} style={{width:"82.6406px"}}>Department</th>
                <th className='sorting' tabIndex="0" aria-controls='employee-table' rowSpan={"1"} colSpan={"1"} style={{width:"89.7656px"}}>Date of Birth</th>
                <th className='sorting' tabIndex="0" aria-controls='employee-table' rowSpan={"1"} colSpan={"1"} style={{width:"40.5781px"}}>Street</th>
                <th className='sorting' tabIndex="0" aria-controls='employee-table' rowSpan={"1"} colSpan={"1"} style={{width:"29.3281px"}}>City</th>
                <th className='sorting' tabIndex="0" aria-controls='employee-table' rowSpan={"1"} colSpan={"1"} style={{width:"34.6562px"}}>State</th>
                <th className='sorting' tabIndex="0" aria-controls='employee-table' rowSpan={"1"} colSpan={"1"} style={{width:"63.5781px"}}>Zip Code</th>
              </tr>
            </thead>
            <tbody>
              {filterEmployees.length > 0 ?
                (
                  filterEmployees.map((emp, index) => (
                    <tr key={index}>
                      <td>{emp.firstName}</td>
                      <td>{emp.lastName}</td>
                      <td>{emp.startDate}</td>
                      <td>{emp.department}</td>
                      <td>{emp.dateOfBirth}</td>
                      <td>{emp.street}</td>
                      <td>{emp.city}</td>
                      <td>{emp.state}</td>
                      <td>{emp.zipCode}</td>
                    </tr>
                  ))
                ):(
                  <tr className='odd'>
                    <td valign='top' colSpan={"9"} className='dataTables_empty'>No data available in table</td>
                  </tr>
                )
              }
            </tbody>
          </table>
          <div className='divFooter'>
            <div id='employee-table_info' className='dataTables_info'>Showing 0 to 0 of 0 entries</div>
            <div id='employee-table_paginate' className='dataTables_paginate paging_simple_numbers'>
              <a className="paginate-button previous disabled" aria-controls='employee-table' id='employee-table_previous'>Previous</a>
              <a className='paginate-button next disabled' aria-controls='employee-table' id='employee-table_next'>Next</a>
            </div>
          </div>
        </div>
        <Link to="/">Home</Link>
      </div>
    
  )
}

export default EmployeeList