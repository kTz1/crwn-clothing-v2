import { AnyAction } from "redux-saga";
import { CART_ACTION_TYPES, CartItem } from "./cart.types";
import { setCartItems, setIsCartOpen } from "./cart.action";

export type CartState = {
  isCartOpen: boolean;
  cartItems: CartItem[];
};

export const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

// reducer function that takes the current state and an action as arguments
// and returns a new state based on the action type
// it uses a matchable pattern to check the action type and update the state accordingly
export const cartReducer = (
  state = CART_INITIAL_STATE,
  action: AnyAction
): CartState => {
  if (setIsCartOpen.match(action)) {
    return {
      ...state,
      isCartOpen: action.payload,
    };
  }

  if (setCartItems.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    };
  }

  return state;
};
