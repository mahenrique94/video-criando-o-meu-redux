const initializeAction = {
    type: 'REDUX_INITIALIZE'
}

const createStore = (reducer, persistedStore, enhancer) => {
    const listeners = []
    const initialState = persistedStore
        ? persistedStore
        : undefined
    let state = reducer(initialState, initializeAction)
    if (enhancer) {
        return enhancer(createStore, reducer, persistedStore)
    }
    return {
        dispatch: action => {
            state = reducer(state, action)
            listeners.forEach(listener => listener())
        },
        subscribe: listener => {
            listeners.push(listener)
            return () => listener.splice(
                listeners.indexOf(listener)
            )
        },
        getState: () => state
    }
}

const combineReducer = reducers => {
    const keys = Object.keys(reducers)
    return (state = {}, action) => {
        let nextState = {}
        keys.forEach(key => {
            nextState[key] = reducers[key](
                state[key],
                action
            )
        })
        return nextState
    }
}

const compose = fns => {
    if (fns.length === 1) {
        return fns[0]
    }
    return fns.reduce((acc, fn) => args => acc(fn(args)))
}

const applyMiddlewares = middlewares => (createStore, reducer, persistedStore) => {
    const store = createStore(reducer, persistedStore)
    const chainMiddlewares = middlewares.map(middleware =>
        middleware({
            getState: store.getState,
            dispatch: store.dispatch
        })
    )
    const dispatch = compose(chainMiddlewares)(store.dispatch)
    return {
        ...store,
        dispatch
    }
}
