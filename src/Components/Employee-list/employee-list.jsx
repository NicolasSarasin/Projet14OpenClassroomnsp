import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import '../../css/app.css';
import "../Employee-list/employee-list.js";

function EmployeeList() {
  const [employeesList, setEmployeesList] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedValue, setSelectedValue] = useState(10); // par défaut 10
  const [currentPage, setCurrentPage] = useState(1); // page courante
  const [movingCurrentPage, setMovingCurrentPage] = useState(false);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    document.title = "HRnet - Current Employees";
    const employees = JSON.parse(localStorage.getItem("employees") || "[]");
    setEmployeesList(Array.isArray(employees) ? employees : []);
  }, []);

  const filterEmployees = employeesList.filter((emp) =>
    Object.values(emp)
      .join(" ")
      .toLowerCase()
      .includes((search || "").toLowerCase())
  );

  const sortedEmployees = [...filterEmployees].sort((a, b) => {
    if (!sortColumn) return 0;
    const valA = a[sortColumn]?.toString().toLowerCase();
    const valB = b[sortColumn]?.toString().toLowerCase();
    if (valA < valB) return sortDirection === "asc" ? -1 : 1;
    if (valA > valB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalEntries = sortedEmployees.length;
  const totalPages = Math.ceil(totalEntries / selectedValue);

  const startIndex = (currentPage - 1) * selectedValue;
  const endIndex = startIndex + selectedValue;
  const currentEmployees = sortedEmployees.slice(startIndex, endIndex);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // --- Style visuel des icônes
  const getSortClass = (column, direction) => {
    if (sortColumn !== column) return "icon-disabled";
    if (sortDirection === direction) return "icon-active";
    return "icon-disabled";
  };

  const handleSelectChange = (e) => {
    setSelectedValue(Number(e.target.value));
    setCurrentPage(1); // reset à la première page quand on change le nombre d'entrées
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
    setMovingCurrentPage(!movingCurrentPage);
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    setMovingCurrentPage(!movingCurrentPage);
  };
  
  const pageNumbers = () => {
    const pages = [];
    const maxVisible = 5; // nombre max de pages visibles au centre

    if (totalPages <= maxVisible) {
      // si peu de pages, on les affiche toutes
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  }

  const columns = [
    { label: "First Name", key: "firstName" },
    { label: "Last Name", key: "lastName" },
    { label: "Start Date", key: "startDate" },
    { label: "Department", key: "department" },
    { label: "Date of Birth", key: "dateOfBirth" },
    { label: "Street", key: "street" },
    { label: "City", key: "city" },
    { label: "State", key: "state" },
    { label: "Zip Code", key: "zipCode" },
  ];

  return (
    <div id="employee-div" className="container">
      <h1>Current Employees</h1>
      <div id='employee-table-filter' className='dataTables_Wrapper no-footer'>
        <div className='divHeader'>
          <div id='employee-table_length' className='dataTables_length'>
            <label>Show
              <select htmlFor='employee-table_length' aria-controls='employee-table' className='select_employee-table' value={selectedValue} onChange={handleSelectChange}>
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
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
          </div>
        </div>
        <table id="employee-table" className="display dataTable no-footer" role='grid' aria-describedby='employee-table_info'>
          <thead>
            <tr role='row' className='displayThead'>
              {columns.map((col) => (
                <th
                  className='sorting'
                  tabIndex="0"
                  aria-controls='employee-table'
                  rowSpan={"1"} 
                  colSpan={"1"}
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  style={{ cursor: "pointer", userSelect: "none" }}
                >
                  {col.label}
                  <span className="icons">
                    <FontAwesomeIcon
                      icon={faAngleUp}
                      className={`icon ${getSortClass(col.key, "asc")}`}
                    />
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      className={`icon ${getSortClass(col.key, "desc")}`}
                    />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='displayTbody'>
            {currentEmployees.length > 0  ?
              (
                currentEmployees.map((emp, index) => (
                  <tr key={index} role='row' className='odd indexOdd'>
                    <td className="index firstName" colSpan={"1"}>{emp.firstName}</td>
                    <td className="index" colSpan={"1"}>{emp.lastName}</td>
                    <td className="index" colSpan={"1"}>{emp.startDate}</td>
                    <td className="index" colSpan={"1"}>{emp.department}</td>
                    <td className="index" colSpan={"1"}>{emp.dateOfBirth}</td>
                    <td className="index" colSpan={"1"}>{emp.street}</td>
                    <td className="index" colSpan={"1"}>{emp.city}</td>
                    <td className="index" colSpan={"1"}>{emp.state}</td>
                    <td className="index" colSpan={"1"}>{emp.zipCode}</td>
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
          <div id='employee-table_info' className='dataTables_info'>Showing {startIndex + 1} to {Math.min(endIndex, totalEntries)} of{" "}{totalEntries} entries</div>
          <div id='employee-table_paginate' className='dataTables_paginate paging_simple_numbers'>
            <a 
              onClick={handlePrev} 
              disabled={currentPage === 1} 
              className={`paginate-button-previous${currentPage === 1 ? " disabled previous" : " disabled previousCurrent"}`} 
              aria-controls='employee-table' 
              id='employee-table_previous'
            >
              Previous
            </a>
            <span>
              {pageNumbers().map((page,index) =>(
                <a key={index} 
                className={`paginate-button ${
                  page === currentPage ? "current" : "notCurrent"
                }`} 
                onClick={() => typeof page === "number" && setCurrentPage(page)}
                disabled={page === "..."} 
                aria-controls='employee-table'>
                {page}
                </a>
              ))}
            </span>
            <a 
              onClick={handleNext} 
              disabled={currentPage === totalPages || totalEntries === 0} 
              className={`paginate-button-next${currentPage === totalPages || totalEntries === 0 ? " disabled next" : " disabled nextCurrent"}`} 
              aria-controls='employee-table' id='employee-table_next'
            >
              Next
            </a>
          </div>
        </div>
      </div>
      <Link to="/">Home</Link>
    </div>
  )
}

export default EmployeeList