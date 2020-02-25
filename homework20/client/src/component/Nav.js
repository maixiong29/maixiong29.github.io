import React from 'react';
import { Link } from "react-router-dom";
function Nav(props) {

    return (
        <header>
        <nav className="navbar">
                <Link className="navbar-brand" id="brand" to="/">Mai Xiong</Link> 
                    <ul className="nav float-right">
                        <li className="nav-item">
                            <Link className="btn btn-link" to="/about">About Me</Link>
                          </li>
                      <li className="nav-item">
                        <Link className="btn btn-link" id="nav-portfolio" to="/project">Project Gallery</Link>
                      </li>
                      <li className="nav-item">
                          <Link className="btn btn-link" id="nav-contact" to="/contact">Contact</Link>
                        </li>
                    </ul>
              </nav>      
        </header>
    );
}

export default Nav;