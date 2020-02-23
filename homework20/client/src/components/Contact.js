import React from 'react';


function Contact() {

  return (
    <div>
             <h2>Contact</h2>
            <hr>
            <label>Name</label>
            <input type="text" id="full-name" name="name" placeholder="Your name..">
            <label>Email</label>
            <input type="text" id="email" name="email" placeholder="example@gmail.com">
            <label>Message</label>
            <textarea id="message" name="message" style="height:200px"></textarea>
            <input type="submit" value="Submit">
    </div>
  );
}

export default Contact;