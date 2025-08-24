import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      // 👉 Here you can also clear localStorage/session if needed
      navigate("/"); // redirects to homepage
    } else {
      navigate(-1); // go back if user cancels
    }
  }, []);

  return null; // nothing to render, just redirects
};

export default Logout;
