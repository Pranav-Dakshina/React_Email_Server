import axios from "axios"

export function loginAuthenticate(username, password)
{
  return function(dispatch)
  {
    if (username !== undefined && password !== undefined)
    {

      let data = {
          user: username,
          pass: password
      };

      dispatch(
      {
        type: "LOGIN_AUTHENTICATION",
        payload: axios.post("/auth/signin", data),
      });

    }
  }
}

export function sendMail(data)
{
  return function(dispatch)
  {
    dispatch(
    {
      type: "SENDING_MAIL",
      payload: axios.post("/auth/sendmail", data),
    });
  }
}

export function reset()
{
  return function(dispatch)
  {
    dispatch(
      {
        type: "RESET",
        payload: axios.post("/auth/signout"),
      }
    );
  }
}
