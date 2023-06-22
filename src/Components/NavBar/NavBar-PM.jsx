import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import { useRef } from 'react';
import "./HeaderStyles.css";
import TableRowsIcon from '@mui/icons-material/TableRows';
import CloseIcon from '@mui/icons-material/Close';

export default function Navbar_Admin() {
  const navRef = useRef();
  const location = useLocation();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <h3>G3 Technology.</h3>
      </Link>
      <nav ref={navRef}>
        <Link to="/Admin" className={location.pathname === "/" ? "active" : ""}>
          Dashboard
        </Link>
        <Link
          to="/EmpForPm"
          className={location.pathname === "/Employees" ? "active" : ""}
        >
          Employees
        </Link>
        <Link to="/#" className={location.pathname === "/#" ? "active" : ""}>
          Clients
        </Link>
        <Link
          to="/Projects"
          className={location.pathname === "/Projects" ? "active" : ""}
        >
          Projects
        </Link>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <CloseIcon />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <TableRowsIcon />
      </button>
    </header>
  );
}
