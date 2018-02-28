export default function reducer(state = {
  user:
  {
    id: null,
    username: null,
    password: null,
    img: {
      data: Buffer,
      contentType: String
    },
    content: null,
    sentContent: null,
    send: {
      from: null, // sender address
      to: null, // list of receivers
      subject: null, // Subject line
      text: null, // plain text body
      html: null, // html body
    },
  },
  fetching: null,
  fetched: null,
  verify: null,
  sending: null,
  sent: null,
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
          fetched: false,
          error: action.payload
        }
      }
    case "LOGIN_AUTHENTICATION_FULFILLED":
      {
        return {
          ...state,
          fetching: false,
          fetched: true,
          verify: action.payload.data.verify,
          user:
          {
            ...state.user,
            content: action.payload.data.content,
          }
        }
      }
    case "SENDING_MAIL_PENDING":
      {
        return {
          ...state,
          sending: true
        }
      }
    case "SENDING_MAIL_REJECTED":
      {
        return {
          ...state,
          sending: false,
          error: action.payload
        }
      }
    case "SENDING_MAIL_FULFILLED":
      {
        return {
          ...state,
          sending: false,
          sent: true,
        }
      }
    case "RESET_FULFILLED":
      {
        return {
          user:
          {
            id: null,
            username: null,
            password: null,
            img: {
              data: Buffer,
              contentType: String
            },
            content: null,
            send: {
              from: null, // sender address
              to: null, // list of receivers
              subject: null, // Subject line
              text: null, // plain text body
              html: null, // html body
            },
          },
          fetching: null,
          fetched: null,
          sending: null,
          sent: null,
          error: null,
        }
      }

  }

  return state
};
