export default function reducer(state = {
  user:
  {
    id: null,
    username: null,
    password: null,
  },
  fetching: null,
  fetched: null,
  error: null,
}, action)
{

  switch (action.type)
  {
    case "LOGIN_AUTHENTICATION_PENDING":
      {
        return {
          ...state,
          fetching: true
        }
      }
    case "LOGIN_AUTHENTICATION_REJECTED":
      {
        return {
          ...state,
          fetching: false,
          error: action.payload
        }
      }
    case "LOGIN_AUTHENTICATION_FULFILLED":
      {
        return {
          ...state,
          fetching: false,
          fetched: true,
          user:
          {
            ...state.user,
            id: action.payload.data.id,
          }
        }
      }
  }

  return state
};
