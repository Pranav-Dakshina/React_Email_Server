import axios from "axios"

export const verifyUser = (username) => (
  (dispatch) => {
    if (username !== undefined)
    {

      let data = {
        user: username,
      };

      dispatch({
        type: "VERIFY_USER",
        payload: axios.post("/verifyUser", data)
      });

    }
  }
)

export const submitSignUp = (data) => (
  (dispatch) => {
    dispatch({
      type: "SUBMIT_SIGNUP",
      payload: axios.post("/submitSignUp", data)
    });
  }
)
