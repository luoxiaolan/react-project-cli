/**
 * @file actions
 */
import * as services from './services';

import {
    DEMO_FETCH
} from './reducer';

export const fetch = () => function (dispatch) {
    services.fetch().then(
        res => {
            dispatch({
                type: DEMO_FETCH,
                data: res.data.content
            });
        }
    ).catch(
        function (err) {
            console.log(err);
        }
    );
};
