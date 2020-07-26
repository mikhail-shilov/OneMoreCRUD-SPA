import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleWare from "redux-thunk";

import dataReducer from "./data-reducer";

const reducers = combineReducers({
    data: dataReducer,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

export default store;
window.store = store;