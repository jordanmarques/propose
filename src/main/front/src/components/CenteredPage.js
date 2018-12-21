import React from "react";
import AlignCenterColumn from "./AlignCenterColumn";

const CenteredPage = ({children}) => {
    return (
        <AlignCenterColumn>
            <div className="col col-md-8">
                {children}
            </div>
        </AlignCenterColumn>
    )
};

export default CenteredPage
