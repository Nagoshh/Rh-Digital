import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/config";

function Navbar() {
  const handleLogout = async () => {
    await auth.signOut();
    window.location.href = "/login";
  };

  return (
    <nav style={{ padding: "1rem", background: "#eee" }}>
      <Link to="/">Home</Link> | <Link to="/vagas">Vagas</Link> | <Link to="/perfil">Perfil</Link>
      <button onClick={handleLogout} style={{ marginLeft: "1rem" }}>Logout</button>
    </nav>
  );
}

export default Navbar;