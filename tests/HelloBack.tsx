import * as React from 'react';
import 'react-dom'
import {renderIntoDocument} from 'react-dom/test-utils'
import HelloBack from 'popup/components/HelloBack'

describe('HelloBack', () => {
    const expectedMessage = 'Hello Jest Tests';
    let helloBack = renderIntoDocument(<HelloBack message={expectedMessage}/>) as HelloBack

    it('should have a message prop', () => {
        expect(helloBack.props.message).toBe(expectedMessage)
    });

    it('should have a function to communicate with the background', () => {
        expect(typeof helloBack.tellBackgroundToSayHello).toBe('function')
    });
});
