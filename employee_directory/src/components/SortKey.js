import React from "react";

function SortKey(props) {
  return(
  <div>
    <div className="card text-center">
      <div className="card-header">
        <h2>Sort By</h2>
      </div>
      <form>
        <input onChange={props.handleInputChange} type="radio" id="firstName" name="sortKey" value="firstName" />
        <label for="firstName">First Name</label><br />
        <input onChange={props.handleInputChange} type="radio" id="lastName" name="sortKey" value="lastName" />
        <label for="lastName">Last Name</label><br />
        <input onChange={props.handleInputChange} type="radio" id="birthDate" name="sortKey" value="birthDate" />
        <label for="birthDate">Date of Birth</label><br />
        <input onChange={props.handleInputChange} type="radio" id="location" name="sortKey" value="location" />
        <label for="location">Location</label><br />
      </form>
    </div>
  </div>)
}

export default SortKey;
