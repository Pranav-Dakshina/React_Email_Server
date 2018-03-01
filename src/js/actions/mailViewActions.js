export const mailViewAdd = (data, ind) => {
  return function(dispatch) {
      dispatch({
        type: "MAIL_VIEW_ADD",
        payload: {
          data: data,
          ind: ind
        }
      })
  }
}

export const mailViewRemove = () => {
  return function(dispatch) {
      dispatch({
        type: "MAIL_VIEW_REMOVE"
      })
  }
}
