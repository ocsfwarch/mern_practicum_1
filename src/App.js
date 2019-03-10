import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import ShowWelcome        from "./components/show-welcome.component.js";
import CreateUploadEntry  from "./components/create-uploadEntry.component.js";
import EditTextFileList   from "./components/edit-textfilelist.component.js";
import ShowTextFileList   from "./components/show-textfilelist.component.js";
import CreateAudioFile    from "./components/create-audiofile.component.js";
import ShowSearch         from "./components/show-search.component.js";


class App extends Component {

  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-dark navbar-test" >
            <div className="navbar-brand" title="MERN Stack Practium">
            
            <Link to="/" className="link-ocsa" >MERN Stack Practium</Link>
            </div>
            
             <div className="collapse navbar-collapse" >
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item nav-item-ocsa">
                    <Link to="/create" className="nav-link btn btn-dark btn-ocsa">Upload Audio</Link>
                </li>
                <li className="navbar-item nav-item-ocsa">
                    <Link to="/record" className="nav-link btn btn-dark btn-ocsa">Create Audio</Link>
                </li>
                <li className="navbar-item nav-item-ocsa">
                    <Link to="/search" className="nav-link btn btn-dark btn-ocsa">Transcript List</Link>
                </li>
              </ul>
            </div>
          </nav>
          <Route path="/" exact        component={ShowWelcome} />
          <Route path="/record"        component={CreateAudioFile} />
          <Route path="/search"        component={ShowSearch} />
          <Route path="/search/:email" component={ShowTextFileList} />
          <Route path="/edit/:id"      component={EditTextFileList} />
          <Route path="/create"        component={CreateUploadEntry} />
        </div>
      </Router>
    );
  }
}

export default App;
