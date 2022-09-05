import React from 'react';
import renderer from 'react-test-renderer';
import Navbar from './Navbar';

describe('Style', () => {
    test('Has logo', () => {
        const navbar = renderer.create(<Navbar/>);
        const img = <img src={"../../public/logo.png"}/>;
        expect(navbar.contains(img)).toEqual(true);
    });
});