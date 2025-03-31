import { createSelector } from "reselect";
import { CartState } from "./cart.reducer";

const selectCartReducer = (state): CartState => state.cart;

// create cart selector
export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

// create is cart open selector
export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

// create cart count selector
export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

// create cart total selector
export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  )
);
