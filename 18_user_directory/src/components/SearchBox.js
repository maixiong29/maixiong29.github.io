import React from "react";
import "./search.css";

function SearchBox(props) {
  return (
    <div className="container">
      <br></br>
      <div className="card text-center">
        <div className="form-group" style={{ padding: '22px' }}>
          <label htmlFor="search">{props.searchtype} Search Users</label>
          <input
            onChange={props.handleInputChange}
            value={props.value}
            searchtype={props.searchtype}
            name="search"
            type="text"
            className="form-control"
            placeholder="First Name"
            id="search"
          />
        </div>
      </div>
    </div>
  );
}

export default SearchBox;