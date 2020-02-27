import React from "react";
import "../styles/style.css";

function Row(props) {
  return <div className={`row${props.fluid ? "-fluid" : ""}`}>{props.children}</div>;
}

export default Row;