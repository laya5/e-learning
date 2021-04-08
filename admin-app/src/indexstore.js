import { combineReducers } from "redux";
import authreducers from "./auth.reducers";
import userReducers from "./user.reducers";
import categoryReducer from "./categories.reducers";
import Productreducer from "./products.reducers";
import orderReducer from "./orders.reducers";
const rootReducer = combineReducers({
  auth: authreducers,
  user: userReducers,
  category: categoryReducer,
  Product: Productreducer,
  order: orderReducer,
});
export default rootReducer;
