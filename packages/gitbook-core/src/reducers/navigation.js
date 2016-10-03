const { Record, List } = require('immutable');
const ACTION_TYPES = require('../actions/TYPES');

const NavigationState = Record({
    // Are we loading a new page
    loading: Boolean(false),
    // Did we fail loading a page?
    error:   null,
    // Listener for history changes
    listeners: List()
});

function reduceNavigation(state, action) {
    state = state || NavigationState();
    switch (action.type) {

    case ACTION_TYPES.PAGE_FETCH_START:
        return state.merge({
            loading: true
        });

    case ACTION_TYPES.PAGE_FETCH_END:
        return state.merge({
            loading: false
        });

    case ACTION_TYPES.PAGE_FETCH_ERROR:
        return state.merge({
            loading: false,
            error:   action.error
        });

    case ACTION_TYPES.NAVIGATION_LISTEN:
        return state.merge({
            listeners: state.listeners.push(action.listener)
        });

    default:
        return state;

    }
}

module.exports = reduceNavigation;
