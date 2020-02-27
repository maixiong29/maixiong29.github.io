import React from "react";
import "../styles/style.css";

function Container(props) {
  return <div className={`container${props.fluid ? "-fluid" : ""}`}>{props.children}</div>;
}

export default Container;