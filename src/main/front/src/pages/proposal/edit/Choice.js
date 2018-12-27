import React from 'react';
import Cross from "../../../images/Cross";
import Row from "../../../components/Row";
import User from "../../../images/User";
import ExternalLink from "../../../images/ExternalLink";

const Choice = ({choice, onDelete}) => {

    const openInNewTab = (url) => {
        const win = window.open(url, '_blank');
        win.focus();
    };

    return (
        <div className="choice">
            <Row>
                <div className=" userNameChoice">
                    <User color="#e2574c"/>
                    &nbsp;{choice.ownerName}
                </div>
                <div className="nameChoice">
                    <b>{choice.name}</b>
                    {
                        choice.metadata ?
                            <span className="pointer" onClick={ () => openInNewTab(choice.metadata)}>
                                &nbsp;
                                <ExternalLink height="15" color="#e2574c"/>
                            </span>
                            :
                            <span/>
                    }

                </div>
                <div className="deleteChoice">
                    <span className="pointer" onClick={ () => onDelete(choice.id)}>
                        <Cross height="25" color="#e2574c"/>
                    </span>
                </div>
            </Row>
        </div>
    );
};

export default Choice;
