/**
 * @file 提示组件 js
 */
import styles from './index.scss';

import React, {Component} from 'react';

export const Loading = props => {
    return <div className={styles.loading}>
        <i className={'iconfont ' + styles.tipsAnimation}>&#xe6b0;</i>
        {props.loadMsg ? props.loadMsg : '加载中...'}
    </div>;
};

export const error = msg => {
    const ele = document.createElement('div');
    ele.innerText = msg;
    ele.setAttribute('class', styles.error);
    document.body.appendChild(ele);

    setTimeout(() => {
        document.body.removeChild(ele);
    }, 3000);
};
