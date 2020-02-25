
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./Nav";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Project from "./Project";
import Footer from "./Footer";
function Container() {
    return (
        <Router>
            <Nav />
            <div className="container">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/project" component={Project} />
                    <Route exact path="/contact" component={Contact} />
                    <Route exact path="/about" component={About} />
                    <Route component={Home} />
                </Switch>
            </div>
            <Footer />
        </Router>
    );
}

export default Container;