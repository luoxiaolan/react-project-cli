/**
 * @file 主站主程序主入口 js
 */

import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware,compose} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import './index.scss';
import reducer from './rootReducer';
import App from './pages/App';

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunkMiddleware)
    )
);

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
