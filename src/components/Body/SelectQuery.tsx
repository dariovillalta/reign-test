//Libraries Imports
import React from 'react';

//Other Imports
import clock from"../../date.svg";
import like from"../../like.svg";
import unlike from"../../unlike.svg";

//Styles

//Types
type MyProps = {
    defaultValue: string,
    changeDefaultValue: (query: string) => void,
};

export default function SelectQuery(props: MyProps) {

    const changeQuery = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const query = e.target.value;
        localStorage.setItem('query', query);
        props.changeDefaultValue(query);
    }

    return (
        <select className="custom-select" defaultValue={props.defaultValue} onChange={changeQuery} aria-label="framework" name="framework">
            <option value="" disabled>Select your news</option>
            <option value="angular">Angular</option>
            <option value="reactjs">React</option>
            <option value="vuejs">Vuejs</option>
        </select>
    );
}