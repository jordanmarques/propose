import React from 'react';
import Cross from "../../images/Cross";
import Row from "../../components/Row";

const Choice = ({choice, onDelete}) => {
    return (
        <div className="choice">
            <Row>
                <div className="flex-grow-1">
                    <span>{choice.name}</span>
                </div>
                <div className="flex-grow-1 deleteChoice">
                    <span className="pointer" onClick={ () => onDelete(choice.id)}>
                        <Cross height="25"/>
                    </span>
                </div>
            </Row>
        </div>
    );
};

export default Choice;
