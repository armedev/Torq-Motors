import { LikedActionTypes } from "./liked-types";

export const updateLiked = (likedArray) => ({
  type: LikedActionTypes.UPDATE_LIKED,
  payload: likedArray,
});
