// src/Navbar.js
import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg fixed-top text-light bg-secondary">
      <a className="navbar-brand text-white" href="#">BDD Testcase Generator with GenAI</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      {/* <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="#"><span className="sr-only">(current)</span></a>
          </li>          
        </ul>
      </div> */}
    </nav>
  );
};

export default Navbar;
