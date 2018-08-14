/**
 * @file reducer
 */
export const DEMO_FETCH = 'DEMO_FETCH';

const init = {
    endFetching: false,
    data: {}
};

export default function demo(state = init, action) {
    switch (action.type) {
        case DEMO_FETCH:
            return {
                ...state,
                endFetching: true,
                data: action.data
            };
            break;
        default:
            return state;
    }
}
