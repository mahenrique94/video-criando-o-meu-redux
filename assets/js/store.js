const ACTIONS_TYPES = {
    INCREMENT: 'INCREMENT',
    DECREMENT: 'DECREMENT',
}

const INITIAL_STATE = {
    counter: 0
}

const actions = {
    increment: () => ({
        type: ACTIONS_TYPES.INCREMENT
    }),
    decrement: () => ({
        type: ACTIONS_TYPES.DECREMENT
    })
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ACTIONS_TYPES.INCREMENT:
            return { ...state, counter: state.counter + 1 }
        case ACTIONS_TYPES.DECREMENT:
            return { ...state, counter: state.counter - 1 }
        default:
            return state
    }
}

const logger = ({ dispatch, getState }) => {
    return next => action => {
        console.log('Updating store')
        console.log('Old state => ', JSON.stringify(getState()))
        if (typeof action === 'function') {
            return action(dispatch, getState)
        }
        return next(action)
    }
}

const middlewares = [
    logger
]

// Criando store com vários reducers
// const store = createStore(combineReducer({
//     counterReducer: reducer
// }))

// Criando store com persistedStore
// const store = createStore(reducer, { counter: 10 })

const store = createStore(
    reducer,
    null,
    applyMiddlewares(middlewares)
)

// Ouvindo mudanças na store
store.subscribe(() => console.log(store.getState()))

store.dispatch(actions.increment())
store.dispatch(actions.increment())
store.dispatch(actions.decrement())
