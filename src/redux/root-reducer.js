import { combineReducers } from "redux";
import shopReducer from "./shop/shop-reducer";
import userReducer from "./user/user-reducer";
import likedReducer from "./liked/liked-reducer";

const rootReducer = combineReducers({
  user: userReducer,
  shop: shopReducer,
  likedCollections: likedReducer,
});

export default rootReducer;
