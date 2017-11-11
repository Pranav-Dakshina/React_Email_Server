import axios from "axios"

export function loginAuthenticate(username, password)
{
  return function(dispatch)
  {
    if (username !== undefined && password !== undefined)
    {
      // console.log("inside actions");
      // console.log(username);
      // console.log(password);
      //
      // console.log("after actions");

      let data = {
          user: username,
          pass: password
      };

      dispatch(
      {
        type: "LOGIN_AUTHENTICATION",
        payload: axios.post("/auth/signin", data),
      });

      // axios.post("/auth/signin", data)
      //   .then((response) =>
      //   {
      //     dispatch(
      //     {
      //       type: "LOGIN_AUTHENTICATION_FULFILLED",
      //       payload: response.data
      //     });
      //   })
      //   .catch((err) =>
      //   {
      //     dispatch(
      //     {
      //       type: "LOGIN_AUTHENTICATION_REJECTED",
      //       payload: err
      //     });
      //   })
    }
  }
}
