import { combineReducers } from "redux";
import authReducer from "./authReducer"; // Adjust the import path as per your project

const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here
});

export default rootReducer;
