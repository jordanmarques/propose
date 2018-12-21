import React, {Component} from 'react';

import {Link} from "react-router-dom"
import CenteredPage from "../components/CenteredPage";
import Jumbotron from "../components/Jumbotron";

class IndexPage extends Component {
    render() {
        return (
            <CenteredPage>
                    <Jumbotron>
                        <div id="greetings">
                            <h1 className="display-4">Welcome to Proposal !</h1>
                            <Link to={"/new/proposal"}>
                                <button className="btn btn-primary btn-lg">Create a new list of propositions</button>
                            </Link>
                        </div>
                    </Jumbotron>
            </CenteredPage>
        );
    }
}

export default IndexPage;
