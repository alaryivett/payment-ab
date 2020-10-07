import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/app';

localStorage.clear();

ReactDOM.render(
    <App/>,
    document.querySelector('#app')
);
