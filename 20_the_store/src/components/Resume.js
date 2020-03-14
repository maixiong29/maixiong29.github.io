import React, { Component } from 'react';
export default  class Resume extends Component {
  render() {
    let resumeData = this.props.resumeData;
    return (
      <section id="resume">

         <div className="row education">

         <h1><a href="Resume.pdf">Checkout my resume</a></h1>


         </div>

      </section>
    );
  }
}