import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import "../../css/app.css";

function EmployeeList() {
  const [employeesList, setEmployeesList] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedValue, setSelectedValue] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    document.title = "HRnet - Current Employees";
    const employees = JSON.parse(localStorage.getItem("employees") || "[]");
    setEmployeesList(Array.isArray(employees) ? employees : []);
  }, []);

  // --- Recherche
  const filteredEmployees = employeesList.filter((emp) =>
    Object.values(emp)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // --- Tri
  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (!sortColumn) return 0;
    const valA = a[sortColumn]?.toString().toLowerCase();
    const valB = b[sortColumn]?.toString().toLowerCase();
    if (valA < valB) return sortDirection === "asc" ? -1 : 1;
    if (valA > valB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // --- Pagination
  const totalEntries = sortedEmployees.length;
  //const totalPages = Math.ceil(totalEntries / selectedValue);
  const startIndex = (currentPage - 1) * selectedValue;
  const endIndex = startIndex + selectedValue;
  const currentEmployees = sortedEmployees.slice(startIndex, endIndex);

  // --- Changement d'ordre de tri
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

      {/* Filtrage */}
      <div className="divHeader">
        <div className="dataTables_length">
          <label>
            Show
            <select
              value={selectedValue}
              onChange={(e) => {
                setSelectedValue(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            entries
          </label>
        </div>
        <div className="dataTables_filter">
          <label>
            Search:
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
        </div>
      </div>

      {/* Tableau */}
      <table className="display dataTable no-footer">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
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
        <tbody>
          {currentEmployees.length > 0 ? (
            currentEmployees.map((emp, i) => (
              <tr key={i}>
                {columns.map((col) => (
                  <td key={col.key}>{emp[col.key]}</td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="dataTables_empty">
                No data available in table
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination simple */}
      <div className="divFooter">
        <div className="dataTables_info">
          Showing {startIndex + 1} to {Math.min(endIndex, totalEntries)} of{" "}
          {totalEntries} entries
        </div>
      </div>

      <Link to="/">Home</Link>
    </div>
  );
}

export default EmployeeList;