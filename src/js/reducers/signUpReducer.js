export default function reducer(state = {
  form:
  {
    available: null,
    firstname: null,
    lastname: null,
    username: null,
    password: null,
  },
  fetching: null,
  fetched: null,
  submitting: null,
  submitted: null,
  error: null,
}, action)
{

  switch (action.type)
  {
    case "VERIFY_USER_PENDING":
      {
        return {
          ...state,
          fetching: true
        }
      }
    case "VERIFY_USER_REJECTED":
      {
        return {
          ...state,
          fetching: false,
          error: action.payload
        }
      }
    case "VERIFY_USER_FULFILLED":
      {
        return {
          ...state,
          fetching: false,
          fetched: true,
          form:
          {
            ...state.form,
            available: action.payload.data.available,
          }
        }
      }
    case "SUBMIT_SIGNUP_PENDING":
      {
        return {
          ...state,
          submitting: true
        }
      }
    case "SUBMIT_SIGNUP_REJECTED":
      {
        return {
          ...state,
          submitting: false,
          error: action.payload
        }
      }
    case "SUBMIT_SIGNUP_FULFILLED":
      {
        return {
          ...state,
          submitting: false,
          submitted: true,
        }
      }
    case "RESET_FULFILLED":
      {
        return {
          form:
          {
            available: null,
            firstname: null,
            lastname: null,
            username: null,
            password: null,
          },
          fetching: null,
          fetched: null,
          submitting: null,
          submitted: null,
          error: null,
        }
      }
  }

  return state
};
