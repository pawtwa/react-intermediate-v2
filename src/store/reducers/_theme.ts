import { Reducer, AnyAction } from "redux";

const reducer: Reducer = (state = "green", action: AnyAction) => {
  if (action.type === "CHANGE_THEME") {
    return action.payload;
  } else if (action.type === "CLEAN_THEME") {
    return;
  }
  return state;
};

export default reducer;
