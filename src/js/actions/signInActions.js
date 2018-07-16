import axios from "axios"

export const loginAuthenticate = (username, password) => (
  (dispatch) => {
    if (username !== undefined && password !== undefined)
    {

      let data = {
          user: username,
          pass: password
      }

      dispatch(
      {
        type: "LOGIN_AUTHENTICATION",
        payload: axios.post("/auth/signin", data),
      });

    }
  }
)

export const sendMail = (data) => (
  (dispatch) => {
    dispatch(
    {
      type: "SENDING_MAIL",
      payload: axios.post("/auth/sendmail", data),
    })
  }
)

export const signinVerify = () => (
  (dispatch) => {
    dispatch(
      {
        type: "RESET_FULFILLED"
      }
    )
  }
)

export const reset = () => (
  (dispatch) => {
    dispatch(
      {
        type: "RESET",
        payload: axios.post("/auth/signout"),
      }
    )
  }
)
