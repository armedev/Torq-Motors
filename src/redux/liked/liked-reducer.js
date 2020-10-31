import { LikedActionTypes } from "./liked-types";

const INITIAL_STATE = {
  liked: [],
};

const likedReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LikedActionTypes.UPDATE_LIKED:
      return {
        ...state,
        liked: action.payload,
      };
    default:
      return state;
  }
};

export default likedReducer;
