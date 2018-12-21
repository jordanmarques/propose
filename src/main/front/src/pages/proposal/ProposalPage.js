import React, {Component} from 'react';
import axios from 'axios'
import CenteredPage from "../../components/CenteredPage";
import Jumbotron from "../../components/Jumbotron";
import Input from "../../components/Input";
import Column from "../../components/Column";
import Choice from "./Choice";

class ProposalPage extends Component {

    constructor(props){
        super(props);

        this.state = {
            id: props.match.params.id,
            name: "",
            choices: [],
            newName: "",
            newUrl: "",
            newMail: ""
        }
    }

    componentDidMount() {
        axios.get(`/api/proposal/${this.state.id}`)
            .then(response => {
                this.setState({...response.data})
            })
    }

    render() {
        return (
            <CenteredPage>
                <Jumbotron>
                    <h1 className="mb-5 text-center">{this.state.name}</h1>
                    <Column>
                        {
                            this.state.choices.map(choice => <Choice key={choice.id} choice={choice} onDelete={this.onDelete}/>)
                        }
                    </Column>
                </Jumbotron>
                <Jumbotron>
                    <Column>
                        <Input name={"Proposition"} onChange={this.onNewPropositionInput} value={this.state.newName}/>
                        <br/>
                        <Input name={"Url"} onChange={this.onNewUrlInput} value={this.state.newUrl}/>
                        <br/>
                        <Input name={"Mail"} onChange={this.onNewMailInput} value={this.state.newMail}/>
                        <br/>
                        <button className="btn btn-primary uppercase" onClick={() => this.addChoice()}>Add</button>
                    </Column>
                </Jumbotron>
            </CenteredPage>
        );
    }

    onNewPropositionInput = (string) => {
        this.setState({newName: string})
    };

    onNewUrlInput = (string) => {
        this.setState({newUrl: string})
    };

    onNewMailInput= (string) => {
        this.setState({newMail: string})
    };

    addChoice = () => {

        if(!this.state.newName || this.state.newName.trim() === ""){
            alert("You have to fill 'proposition' field to create a new proposal.");
            return;
        }

        if(this.state.newUrl && !this.isUrlValid(this.state.newUrl)){
            alert("The URL you enter is not valid")
            return;
        }

        if(!this.state.newMail || this.state.newMail.trim() === "" || !this.isEmailValid(this.state.newMail)){
            alert("You have to enter a correct mail in 'mail' field to create a new proposal.");
            return;
        }

        axios.post(`/api/proposal/${this.state.id}/choices`, {name: this.state.newName, owner: this.state.newMail, metadata: this.state.newUrl})
            .then(response => {
                this.setState({choices: response.data.choices, newName: "", newUrl: "", newMail: ""})
            })
    };

    onDelete = (id) => {
        axios.delete(`/api/proposal/${this.state.id}/choices/${id}`)
            .then(response => {
                this.setState({choices: response.data.choices})
            })
    };

    isEmailValid = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    isUrlValid = (url) => {
        const re = /[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&//=]*)?/gi;
        return re.test(url)
    }
}


export default ProposalPage;
