import React from "react";
import ReactDOM from "react-dom";

import {BrowserRouter as Router, Route} from "react-router-dom";

import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css'

import NavBar from "./components/NavBar";
import IndexPage from "./pages/IndexPage";
import ProposalPage from "./pages/proposal/ProposalPage";
import NewProposalPage from "./pages/proposal/new/NewProposalPage";

function App() {
    return (

        <Router>
            <div className="App">
                <NavBar/>
                <Route path="/" exact component={IndexPage}/>
                <Route path="/proposal/:id" component={ProposalPage}/>
                <Route path="/new/proposal" component={NewProposalPage}/>
            </div>
        </Router>
    );
}

const rootElement = document.getElementById("root");

ReactDOM.render(<App/>, rootElement);
