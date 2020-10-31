import { createSelector } from "reselect";

const selectLikedCollections = (state) => state.likedCollections;

export const selectLiked = createSelector(
  [selectLikedCollections],
  (likedCollections) => likedCollections.liked
);
