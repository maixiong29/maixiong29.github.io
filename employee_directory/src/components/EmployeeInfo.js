import React from "react";
import EmployeeList from "../data/employees.json";
import "../styles/style.css";

function EmployeeInfo(props) {
  console.log(props)

  const results = EmployeeList.filter(employee => 
    employee.firstName.toLowerCase().includes(props.search.toLowerCase()) || employee.lastName.toLowerCase().includes(props.search.toLowerCase()) || employee.birthDate.toLowerCase().includes(props.search.toLowerCase()) || employee.location.toLowerCase().includes(props.search.toLowerCase()));

    const sort = function(props, results){
      
      results.sort(function(a, b){

        let x
        let y

          if(props.sortKey === "firstName"){
             x = a.firstName.toLowerCase();
             y = b.firstName.toLowerCase();
          }
          else if(props.sortKey === "lastName") {
             x = a.lastName.toLowerCase();
             y = b.lastName.toLowerCase();
          }
          else if(props.sortKey === "birthDate") {
             x = a.birthDate.toLowerCase();
             y = b.birthDate.toLowerCase();
          }
          else if(props.sortKey === "location") {
             x = a.location.toLowerCase();
             y = b.location.toLowerCase();
          }
          if(props.sortOrder === 1){
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
          }
          else{
            if (x < y) {return 1;}
            if (x > y) {return -1;}
            return 0;
          };
        }
      );
    }
    sort(props, results);

    const styles = {
      columnHeader: {
        fontSize: 20
      }
    };

  return (
    <div className="text-center">
      {results.length > 0 ? (
        <ul className="list-group">

          <h2>Employee List</h2>
          <br />

          <div className="row">
            <div className="col-md-1" style={styles.columnHeader}></div>
            <div className="col-md-2" style={styles.columnHeader}><b><u>Name</u></b></div>
            <div className="col-md-2" style={styles.columnHeader}><b><u>Email</u></b></div>
            <div className="col-md-2" style={styles.columnHeader}><b><u>Phone Number</u></b></div>
            <div className="col-md-2" style={styles.columnHeader}><b><u>Date of Birth</u></b></div>
            <div className="col-md-3" style={styles.columnHeader}><b><u>Location</u></b></div>
          </div>

          {results.map(result => (
            <li className="list-group-item" key={result.id}>
              <div className="row">
                <div className="col-md-1"><img src={result.img} alt={result.firstName}></img></div>
                <div className="col-md-2"><b>{result.firstName}</b> <b>{result.lastName}</b></div> 
                <div className="col-md-2">{result.email}</div>
                <div className="col-md-2">{result.phone}</div>
                <div className="col-md-2">{result.birthDate}</div>
                <div className="col-md-3">{result.location}</div>
              </div>
            </li>
          ))}
        </ul >
      ) : (
          <h2>No Employees Found</h2>
        )}
    </div>
  );
}

export default EmployeeInfo;