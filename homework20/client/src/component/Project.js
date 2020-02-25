import React from 'react';
import Projectdata from "../data/Projectdata.json";

function Project() {

  return (
    <div>
    <h3>Project</h3>
    <div className="row">

      {Projectdata.map((info) => (
        <div className="col-md-6" key={info.id}>
          <div style={{margin:"5px", padding: "5px"}} >
            <b>{info.name}</b>
            <img src={info.image} alt="preveiw of the site linked" style={{ maxWidth: "100%" }} />
            <p>deployed:<a href={info.deployed}>{info.deployed} </a></p>
            <p>github:<a href={info.github}>github:{info.github}</a></p>
            </div>
        </div>
      ))}

    </div>
  </div>
);
}

export default Project;