import App from './app';
import React from 'react';
import reducer from './reducer';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

(()=> {
    const store = createStore(reducer);
    const el = document.getElementById('app');
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        el);

})()