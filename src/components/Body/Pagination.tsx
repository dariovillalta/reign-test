//Libraries Imports
import {useEffect, useState} from 'react';

//Styles

//Types
type MyProps = {
    totalPages: number
};

export default function Pagination(props: MyProps) {

    const availablePages = () => Array.from({length: props.totalPages}, (_, i) => i + 1).map((page, index) => {
        return  <div className="display-inline-block news-navigation-container-tile text-center" key={index}>
                    {page}
                </div>;
    });

    return (
        <div>
            <div className="display-inline-block news-navigation-container-tile text-center">{"<"}</div>
            {availablePages()}
            <div className="display-inline-block news-navigation-container-tile text-center">{">"}</div>
        </div>
    );
}