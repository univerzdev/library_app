import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <nav className="navigation">
      <div className="navigation-container">
        <div className="pt-2">
          <Link to="/" className="logo">Knižnica</Link>
        </div>
        </div>
    </nav>
  );
}

export default Header;