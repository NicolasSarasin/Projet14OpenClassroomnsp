import React from "react";
import ReactDOM from "react-dom/client";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import './css/app.css'
import App from './App.jsx'
import EmployeeList from "./Components/Employee-list/employee-list.jsx"
import Error from "./Components/Error_404/index.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/employeeList" element={<EmployeeList />}/>
        <Route path="/Error" element={<Error />}/>
        <Route path="*" element={<Error />}/>
      </Routes>
    </Router>
  </StrictMode>,
)
