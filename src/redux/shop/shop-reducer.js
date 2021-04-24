import { ShopActionTypes } from './shop-types';
import uniqueObjectReturnerFromId from '../../utils/helpers/uniqueObjectReturner';

const INITIAL_STATE = {
  collections: [],
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.UPDATE_COLLECTIONS:
      return {
        ...state,
        collections: uniqueObjectReturnerFromId([
          ...state.collections,
          ...action.payload,
        ]),
      };
    default:
      return state;
  }
};

export default shopReducer;

// import { ShopActionTypes } from "./shop.types";

// const INITIAL_STATE = {
//   collections: null,
// };

// const shopReducer = (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//     case ShopActionTypes.UPDATE_COLLECTIONS:
//       return {
//         ...state,
//         collections: action.payload,
//       };

//     default:
//       return state;
//   }
// };

// export default shopReducer;
