import React from "react";

function SortOrder(props) {
  return(
  <div>
    <div className="card text-center">
      <div className="card-header">
        <h2>Order</h2>
      </div>
      <form>
        <input onChange={props.handleInputChange} type="radio" id="1" name="sortOrder" value="1" />
        <label for="ascending"> Ascending</label><br />
        <input onChange={props.handleInputChange} type="radio" id="-1" name="sortOrder" value="-1" />
        <label for="descending"> Descending</label>
      </form>
    </div>
  </div>)
}

export default SortOrder;