import React, {Component} from 'react';
import axios from 'axios'
import CenteredPage from "../../../components/CenteredPage";
import Jumbotron from "../../../components/Jumbotron";
import Input from "../../../components/Input";
import Column from "../../../components/Column";
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
            newMail: "",
            newUserName: "",
            majorityJudgmentLink: ""
        }
    }

    componentDidMount() {
        axios.get(`/api/proposal/${this.state.id}`)
            .then(response => {
                this.setState({...response.data})
            });

        axios.get(`/api/link/majority-judgment/creation`)
            .then(response => {
                this.setState({majorityJudgmentLink: response.data.link})
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
                    <div className="majoritySection">
                        <button className="btn btn-sm majorityBtn" onClick={() => this.exportToMajorityJudgment()}>Export to Majority Judgment</button>
                    </div>
                </Jumbotron>
                <div className="newPropositionPanel">
                    <Input name={"Proposition"} onChange={value => this.setState({newName: value})} value={this.state.newName}/>
                    <br/>
                    <Input name={"Url"} placeholder={"You can add a link to help users discover your proposition"} onChange={value => this.setState({newUrl: value})} value={this.state.newUrl}/>
                    <br/>
                    <Input name={"Mail"} onChange={value => this.setState({newMail: value})} value={this.state.newMail}/>
                    <br/>
                    <Input name={"Your Name"} onChange={value => this.setState({newUserName: value})} value={this.state.newUserName}/>
                    <br/>
                    <button className="btn btn-primary uppercase" onClick={() => this.addChoice()}>Add</button>
                </div>
            </CenteredPage>
        );
    }

    addChoice = () => {

        if(!this.state.newName || this.state.newName.trim() === ""){
            alert("You have to fill 'proposition' field to create a new proposal.");
            return;
        }

        if(this.state.newUrl && !this.isUrlValid(this.state.newUrl)){
            alert("The URL you enter is not valid");
            return;
        }

        if(!this.state.newMail || this.state.newMail.trim() === "" || !this.isEmailValid(this.state.newMail)){
            alert("You have to enter a correct mail in 'mail' field to create a new proposal.");
            return;
        }

        if(!this.state.newUserName || this.state.newUserName.trim() === ""){
            alert("You have to enter your name in 'Your Name' field");
            return;
        }

        axios.post(`/api/proposal/${this.state.id}/choices`, {
            name: this.state.newName,
            owner: this.state.newMail,
            metadata: this.state.newUrl,
            ownerName: this.state.newUserName})
            .then(response => {
                this.setState({choices: response.data.choices, newName: "", newUrl: "", newMail: "", newUserName: ""})
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
    };

    openInNewTab = (url) => {
        const win = window.open(url, '_blank');
        win.focus();
    };

    exportToMajorityJudgment() {
        const title = this.state.name;
        const attendees = this.state.choices
            .map(choice => choice.owner)
            .join("|");
        const choices = this.state.choices
            .map(choice => choice.name)
            .join("|");

        const link = this.state.majorityJudgmentLink
            .replace("%title%", title)
            .replace("%attendees%", attendees)
            .replace("%choices%", choices);

        console.log(link);

        this.openInNewTab(encodeURI(link))
    }
}


export default ProposalPage;
