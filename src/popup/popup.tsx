import './popup.css'
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import HelloBack from 'popup/components/HelloBack'
import Copyrights from 'popup/components/Copyrights'

class App extends React.Component<undefined, undefined> {
    render(): React.ReactElement<undefined> {
        return (
            <div>
                <HelloBack message={'Hello from the background!'}/>
                <Copyrights/>
            </div>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.querySelector('#app-root-element')
);
