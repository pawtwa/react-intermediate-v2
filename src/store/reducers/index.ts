import { combineReducers } from "redux";
import location from "./_location";
import theme from "./_theme";

export interface AppState {
  theme: string;
  location: string;
}

const appState: AppState = { theme: "red", location: "" };

const reducer = combineReducers<AppState>({
  theme,
  location,
});

export default reducer;
