import React from "react";
import "../styles/style.css";

function SearchForm(props) {
  return (
    <div className="card text-center">
      <div className="card-header">
        <h2>Filter</h2>
      </div>
      <form>
        <div className="form-group" style={{ padding: '22px' }}>
          <input
            onChange={props.handleInputChange}
            value={props.value}
            searchtype={props.searchtype}
            name="search"
            type="text"
            className="form-control"
            placeholder="First or Last Name, Birth Date, Location"
            id="search"
          />
          <br />
        </div>
      </form>
    </div>

  );
}

export default SearchForm;