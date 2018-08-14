/**
 * @file services
 */

import request from '../../common/js/request';

export const fetch = (data = {}) => request('/ajax/demo', {
    method: 'post',
    body: data
});
