/**
 * @file 程序主入口 js
 */

import React, {Component, asyncComponent} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect, Match} from 'react-router-dom';
import Loadable from 'react-loadable';
import {Loading} from '../common/components/tip';

const demo = Loadable({
    loader: () => import('./demo'),
    loading: Loading
});

const notFound = Loadable({
    loader: () => import('./404'),
    loading: Loading
});


export default class App extends Component {
    render() {
        return <Router>
            <Switch>
                <Route pattern='/demo' component={demo}></Route>
                <Route pattern='/*' component={notFound}></Route>
                <Route>
                    <Redirect to="/demo"/>
                </Route>
            </Switch>
        </Router>;
    }
}
