import { applyMiddleware, createStore } from "redux";
import indexStore from "../reducers/indexstore";
import thunk from "redux-thunk";

const store = createStore(indexStore, applyMiddleware(thunk));

export default store;
