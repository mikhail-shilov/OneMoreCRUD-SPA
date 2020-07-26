import {combineReducers, createStore} from "redux";

import dataReducer from "./data-reducer";
import editorReducer from "./editor-reducer";
import filterReducer from "./filter-reducer";

const reducers = combineReducers({
    data: dataReducer,
    editor: editorReducer,
    filter: filterReducer
});

let store = createStore(reducers);

export default store;
window.store = store;