import { USER_ACTION_TYPE } from "./user.types";
import { createAction } from "../../utils/reducer/reducer.utils";

// action creator to set the current user
export const setCurrentUser = (user) =>
  createAction(USER_ACTION_TYPE.SET_CURRENT_USER, user);
