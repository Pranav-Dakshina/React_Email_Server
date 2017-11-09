import axios from "axios"

export function verifyUser(username)
{
  return function(dispatch)
  {
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
}

export function submitSignUp(data)
{
  return function(dispatch)
  {
    dispatch({
      type: "SUBMIT_SIGNUP",
      payload: axios.post("/submitSignUp", data)
    });
  }
}
