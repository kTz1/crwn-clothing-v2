import USER_ACTION_TYPES from "./user.types";

const USER_INITIAL_STATE = {
  currentUser: null,
};

// user reducer
export const userReducer = (state = USER_INITIAL_STATE, action) => {
  // receive every action
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };

    // if the action has the result return a default state
    default:
      return state;
  }
};
