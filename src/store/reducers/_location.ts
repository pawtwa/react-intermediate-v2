import { Reducer, AnyAction } from "redux";

const reducer: Reducer = (state = "Seattle, WA", action: AnyAction) => {
  if (action.type === "CHANGE_LOCATION") {
    return action.payload;
  } else if (action.type === "CLEAN_LOCATION") {
    return;
  }
  return state;
};

export default reducer;
