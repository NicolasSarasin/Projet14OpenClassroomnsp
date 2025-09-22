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
                <th className='sorting' tabIndex="0" aria-controls='employee-table' rowSpan={"1"} colSpan={"1"} style={{width:"77px"}}>First Name</th>
                <th className='sorting' tabIndex="0" aria-controls='employee-table' rowSpan={"1"} colSpan={"1"} style={{width:"74px"}}>Last Name</th>
                <th className='sorting' tabIndex="0" aria-controls='employee-table' rowSpan={"1"} colSpan={"1"} style={{width:"71px"}}>Start Date</th>
                <th className='sorting' tabIndex="0" aria-controls='employee-table' rowSpan={"1"} colSpan={"1"} style={{width:"83px"}}>Department</th>
                <th className='sorting' tabIndex="0" aria-controls='employee-table' rowSpan={"1"} colSpan={"1"} style={{width:"90px"}}>Date of Birth</th>
                <th className='sorting' tabIndex="0" aria-controls='employee-table' rowSpan={"1"} colSpan={"1"} style={{width:"41px"}}>Street</th>
                <th className='sorting' tabIndex="0" aria-controls='employee-table' rowSpan={"1"} colSpan={"1"} style={{width:"29px"}}>City</th>
                <th className='sorting' tabIndex="0" aria-controls='employee-table' rowSpan={"1"} colSpan={"1"} style={{width:"35px"}}>State</th>
                <th className='sorting' tabIndex="0" aria-controls='employee-table' rowSpan={"1"} colSpan={"1"} style={{width:"64px"}}>Zip Code</th>
              </tr>
            </thead>
            <tbody className='index'>
              {filterEmployees.length >= 0 ?
                (
                  filterEmployees.map((emp, index) => (
                    <tr key={index} >
                      <td colSpan={"1"}>{emp.firstName}</td>
                      <td colSpan={"1"}>{emp.lastName}</td>
                      <td colSpan={"1"}>{emp.startDate}</td>
                      <td colSpan={"1"}>{emp.department}</td>
                      <td colSpan={"1"}>{emp.dateOfBirth}</td>
                      <td colSpan={"1"}>{emp.street}</td>
                      <td colSpan={"1"}>{emp.city}</td>
                      <td colSpan={"1"}>{emp.state}</td>
                      <td colSpan={"1"}>{emp.zipCode}</td>
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
              <span><a className='paginate-button current' aria-controls='employee-table'></a></span>
              <a className='paginate-button next disabled' aria-controls='employee-table' id='employee-table_next'>Next</a>
            </div>
          </div>
        </div>
        <Link to="/">Home</Link>
      </div>
    
  )
}

export default EmployeeList