import React from 'react';


function Contact() {

  return (
    <div className="row">
    <div className="col-md-6" >
      <div className="card">
        <div className="card-body">
         <h2>Contact</h2>
        <div><hr /></div>
        
        <label>Name</label>
        <input type="text" id="full-name" name="name" placeholder="Your name.." />
        <label>Email</label>
        <input type="text" id="email" name="email" placeholder="example@gmail.com" />
        <label>Message</label>
        <textarea id="message" name="message" ></textarea>
        <input type="submit" value="Submit" />
        </div>
        </div>
      </div>
      </div>
  );
}

export default Contact;