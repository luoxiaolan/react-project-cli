/**
 * @file 程序主入口 js
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './actions';
import styles from './index.scss';
document.title = 'demo';

class Demo extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.fetch();
    }

    render() {
        const demo = this.props.demo;

        return (
            <div>
                {demo.endFetching && <div>{demo.data}</div>}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    demo: state.demo
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Demo);
