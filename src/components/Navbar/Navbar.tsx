//Libraries Imports
import React, {useState} from 'react';

//Components Imports

//Other Imports
import logo from"../../logo.png";

//Styles

//Types
type MyProps = {
};

export default function Filter(props: MyProps) {
    //const [nodes, setNodes] = useState<Node[]>(initialNodes);

    return (
        <div className="full-height full-width row">
            <div className="offset-1 col-2 center-vh-flex">
                <img src={logo} className="full-width"/>
            </div>
        </div>
    );
}