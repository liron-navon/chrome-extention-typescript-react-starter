import * as React from 'react';
import { css } from 'emotion'

class Copyrights extends React.Component<undefined, undefined> {
    render(): React.ReactElement<undefined> {
        return (
            <div className={classes.root}>
                <img className={classes.image} src="/icons/icon_128.png" alt="Smashicons"/>
                <div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
            </div>
        );
    }
}

const classes = {
    root: css({
        padding: '20px 0px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }),
    image: css({
        width: '50px',
        height: 'auto',
        paddingBottom: '20px'
    })
}

export default Copyrights
