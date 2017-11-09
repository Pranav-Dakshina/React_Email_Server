import { combineReducers } from "redux"

import signin from "./signInReducer.js"
import signup from "./signUpReducer.js"

export default combineReducers({
  signin,
  signup
})
