export const mailView = (data, ind) => {
  return function(dispatch) {
      dispatch({
        type: "MAIL_VIEW",
        payload: {
          data: data,
          ind: ind
        }
      })
  }
}
