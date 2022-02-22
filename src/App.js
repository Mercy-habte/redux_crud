import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddJob from "./components/add-job.component";
import Job from "./components/job.component";
import JobsList from "./components/jobs-list.component";

class App extends Component {
  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/jobs"} className="navbar-brand">
            MoltoTerfo
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/jobs"} className="nav-link">
                Jobs
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/jobs"]} component={JobsList} />
            <Route exact path="/add" component={AddJob} />
            <Route path="/jobs/:id" component={Job} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
