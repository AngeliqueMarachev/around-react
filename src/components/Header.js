import React from "react";
import logo from "../images/lead.svg";

function Header() {
  return (
    <header className="header">
      <img
        src={logo}
        alt="Around the U.S logo"
        className="header__logo"
        id="logo"
      />
    </header>
  );
}

export default Header;
