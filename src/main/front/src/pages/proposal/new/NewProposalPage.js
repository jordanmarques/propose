import React, {Component} from 'react';
import CenteredPage from "../../../components/CenteredPage";
import Jumbotron from "../../../components/Jumbotron";
import AlignCenterColumn from "../../../components/AlignCenterColumn";
import Input from "../../../components/Input";
import axios from 'axios'

class NewProposalPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            name: ""
        }
    }

    render() {
        return (
            <CenteredPage>
                <Jumbotron>
                    <div className="p-3">
                        <AlignCenterColumn>
                            <h1>Let's create a new Proposal !</h1>
                            <div className="col col-md-8 mt-3 mb-3">
                               <Input name={"Proposal Name"} onChange={this.onNameInput}/>
                            </div>
                            <button className="btn btn-primary uppercase" onClick={() => this.save()}>Create</button>
                        </AlignCenterColumn>
                    </div>
                </Jumbotron>
            </CenteredPage>
        );
    }

    onNameInput = (string) => {
        this.setState({name: string})
    };

    save = () => {

        if(!this.state.name || this.state.name.trim() === "")
            return;

        axios.post("/api/proposal", Object.assign({}, {name: this.state.name}))
            .then(response => {
                setTimeout(()=>{
                    this.props.history.push("/proposal/" + response.data.id)
                }, 500);

            })
    }
}

export default NewProposalPage;

