import { createStore, combineReducers } from 'redux';


import AppSetState from './reducers/AppSetState';



var allreduces = combineReducers({
    AppSetState: AppSetState,
})


export default Store = createStore(
    allreduces,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);


