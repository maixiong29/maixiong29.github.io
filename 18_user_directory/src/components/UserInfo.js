import React from "react";
import UserList from "../data/directory.json";
import "./style.css";

function UserInfo(props) {
  console.log(props)

  const resultsFirst = UserList.filter(user => user.first.toLowerCase().includes(props.search.toLowerCase()));

  return (
    <div>
      <h2 className="text-center table-title">User Directory</h2>
      {resultsFirst.length > 0 ? (
        <table className="table table-bordered table-sm" cellSpacing="0" width="100%">
          <thead>
            <tr>
              <th scope="col" onClick={() => props.sortBy("first")}>First Name <i class="fa fa-sort" aria-hidden="true"></i></th>
              <th scope="col" onClick={() => props.sortBy("last")}>Last Name <i class="fa fa-sort" aria-hidden="true"></i></th>
              <th scope="col" onClick={() => props.sortBy("position")}>Position <i class="fa fa-sort" aria-hidden="true"></i></th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
            </tr>
          </thead>
          <tbody>
            {resultsFirst.map(result => (
              <tr key={result.id}>
                <td><b>{result.first}</b></td>
                <td>{result.last}</td>
                <td>{result.position}</td>
                <td>{result.email}</td>
                <td>{result.cell}</td>
              </tr>
            ))}
          </tbody>
        </table >
      ) : (
          <h2>No Results</h2>
        )}
    </div>
  );
}

export default UserInfo;