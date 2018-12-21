import React from 'react';

const Column = ({children}) => {
    return (
        <div className="column-flex">
            {children}
        </div>
    );
};

export default Column;
