import { combineReducers } from "redux";
import shopReducer from "./shop/shop-reducer";
import userReducer from "./user/user-reducer";

const rootReducer = combineReducers({
  user: userReducer,
  shop: shopReducer,
});

export default rootReducer;
