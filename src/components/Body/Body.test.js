import React from 'react';
import { fireEvent, render } from "@testing-library/react";
import SelectQuery from './SelectQuery';
require('jest-localstorage-mock');

describe('LocalStorage', () => {

    test('LocalStorage saves onchange select framework', () => {
        function handleClick() {
        }
        const KEY = 'query', VALUE = 'angular';
        const {rerender, getByRole} = render(<SelectQuery defaultValue={''} changeDefaultValue={handleClick}/>);
        const mEvent1 = { target: { value: VALUE } };
        const node = getByRole('combobox', {name: "framework"});
        fireEvent.change(node, mEvent1);
        //Was called
        expect(localStorage.setItem).toHaveBeenLastCalledWith(KEY, VALUE);
        //Is expected value
        expect(localStorage.__STORE__[KEY]).toBe(VALUE);
        //Only one cookie
        expect(Object.keys(localStorage.__STORE__).length).toBe(1);

        //Re-rendering
        rerender(<SelectQuery defaultValue={''} changeDefaultValue={handleClick}/>);
        //Is expected value
        expect(localStorage.__STORE__[KEY]).toBe(VALUE);
        //Only one cookie
        expect(Object.keys(localStorage.__STORE__).length).toBe(1);
    });

    /* test('LocalStorage saves favorites', () => {
    }); */
});