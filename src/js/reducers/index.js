import { combineReducers } from "redux";

import signin from "./signInReducer.js";
import signup from "./signUpReducer.js";
import mailview from "./mailViewReducer.js";

export default combineReducers({
  signin,
  signup,
  mailview
});
