import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles.css";
import { BsCarFrontFill } from "react-icons/bs";
import { BsPersonCircle, BsListCheck } from "react-icons/bs";
import { BsChatDotsFill } from "react-icons/bs";

import { toast } from "react-toastify";

function CustomerNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Manage dropdown state
  const navigate = useNavigate(); // To navigate programmatically
  const userId = sessionStorage.getItem("userId");

  // Handle mouse enter and leave to show/hide the dropdown
  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  // Handle Login and Register click
  const handleLoginClick = () => {
    navigate("/login"); // Navigate to login page
  };

  const handleRegisterClick = () => {
    navigate("/register"); // Navigate to register page
  };

  // Handle Logout click
  const handleLogoutClick = () => {
    sessionStorage.removeItem("userId");
    navigate("/"); // Redirect to home page after logout
  };

  return (
    <nav
      className="navbar navbar-expand-lg px-3"
      style={{ minHeight: "10vh", backgroundColor: "transparent", zIndex: "2" }}
    >
      <div className="container-fluid">
        {/* Brand Logo */}
        <NavLink
          className="navbar-brand text-white d-flex align-items-center"
          to="/"
          style={{ color: "#a9ab99" }}
        >
          <span className="logo-style1" style={{ color: "#a9ab99" }}>
            Rent A Car
          </span>
        </NavLink>

        {/* Toggler for Mobile View */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li
              className="nav-item dropdown"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="btn btn-black"
                style={{
                  color: "#a9ab99",
                  fontWeight: "bold",
                  border: "2px solid #a9ab99",
                  marginTop: "12%",
                }}
              >
                <BsPersonCircle size={20} style={{ marginRight: "8px" }} />
                {userId ? "Profile" : "Sign In"}
              </button>

              {userId && isDropdownOpen && (
                <div
                  className="dropdown-menu show"
                  style={{
                    position: "absolute",
                    backgroundColor: "#fff",
                    border: "1px solid #a9ab99",
                    borderRadius: "5px",
                    zIndex: 1000,
                  }}
                >
                  <button
                    className="dropdown-item"
                    onClick={() => navigate(`/editprofile/${userId}`)}
                  >
                    Profile
                  </button>
                  <button className="dropdown-item" onClick={handleLogoutClick}>
                    Logout
                  </button>
                </div>
              )}

              {!userId && isDropdownOpen && (
                <div
                  className="dropdown-menu show"
                  style={{
                    position: "absolute",
                    backgroundColor: "#fff",
                    border: "1px solid #a9ab99",
                    borderRadius: "5px",
                    zIndex: 1000,
                  }}
                >
                  <button className="dropdown-item" onClick={handleLoginClick}>
                    Login
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={handleRegisterClick}
                  >
                    Register
                  </button>
                </div>
              )}
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link fs-4 fw-semibold"
                to={`/viewrental/${userId}`}
              >
                <button
                  type="button"
                  className="btn btn-white"
                  style={{
                    color: "#a9ab99",
                    fontWeight: "bold",
                    border: "2px solid #a9ab99",
                  }}
                >
                  <BsCarFrontFill size={20} style={{ marginRight: "8px" }} />
                  Rentals
                </button>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link fs-4 fw-semibold"
                to={`/reviews`}
              >
                <button
                  type="button"
                  className="btn btn-white"
                  style={{
                    color: "#a9ab99",
                    fontWeight: "bold",
                    border: "2px solid #a9ab99",
                  }}
                >
                  <BsChatDotsFill size={20} style={{ marginRight: "8px" }} />
                  Reviews
                </button>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default CustomerNavbar;
