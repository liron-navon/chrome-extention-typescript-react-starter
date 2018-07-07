import * as React from 'react';
import { css } from 'emotion'

export interface HalloBackProps {
    message: String
}

class HalloBack extends React.Component<HalloBackProps, undefined> {
    // send a message so the background can get it and say hello
    tellBackgroundToSayHello(message: String): void {
        chrome.runtime.sendMessage({
            request: 'please_say_hello',
            message
        });
    }

    render(): React.ReactElement<HalloBackProps> {
        const { props, tellBackgroundToSayHello } = this;
        const { message } = props;

        return (
            <div>
                <div className={classes.btn} onClick={() => tellBackgroundToSayHello(message)}>
                    Press Me to tell the background process to say hello!
                </div>
            </div>
        );
    }
}

const classes = {
    btn: css({
        textAlign: 'center',
        backgroundColor: '#3399ff',
        padding: '10px 10px',
        margin: 'auto',
        color: 'white',
        borderRadius: '15px',
        cursor: 'pointer',
        fontWeight: 600,
        transition: 'background-color 320ms ease-in-out',
        '&: hover': {
            backgroundColor: '#66ccff'
        }
    })
}

export default HalloBack
