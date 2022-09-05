//Libraries Imports
import React, {useEffect, useState} from 'react';
import {totalPages} from '../../lib/api';

//Components Imports
import ArticleTile from './ArticleTile';
import Pagination from './Pagination';

//Other Imports

//Styles

//Types
type MyProps = {
};

export default function Body(props: MyProps) {
    //const [nodes, setNodes] = useState<Node[]>(initialNodes);

    useEffect(() => {
        const n = async () => {
            const res = totalPages();
            console.log('res', res);
        }
        n();
    }, []);

    return (
        <div className="row body-container">
            <div className="no-padding offset-1 col-10">
                <div className="center-vh-flex">
                    <div className="timeline-option-container">
                        <div className="timeline-option display-inline-block text-center on-cursor-hover selected">
                            <p className="no-marging">All</p>
                        </div>
                        <div className="timeline-option display-inline-block text-center on-cursor-hover">
                            <p className="no-marging">My faves</p>
                        </div>
                    </div>
                </div>
                <div>
                    <select className="custom-select">
                        <option value="" disabled selected>Select your news</option>
                        <option value={"1"}>Angular</option>
                        <option value={"2"}>React</option>
                        <option value={"3"}>Vuejs</option>
                    </select>
                </div>
                <div className="news-container">
                    <ArticleTile articles={[]}/>
                    <div className="news-navigation-container center-vh-flex">
                        <Pagination totalPages={10}/>
                    </div>
                </div>
            </div>
        </div>
    );
}