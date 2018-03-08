export default function reducer(state = {
  content: []
}, action)
{
  switch (action.type)
  {
    case "MAIL_VIEW_ADD":
      {
        let data = state.content.slice()
        data.push(action.payload.data)

        //if( JSON.stringify(data).includes(JSON.stringify(action.payload)) )
        return {
          ...state,
          content: data
        }
      }
    case "MAIL_VIEW_REMOVE":
      {
        let data = state.content.slice()
        data.pop()

        //if( JSON.stringify(data).includes(JSON.stringify(action.payload)) )
        return {
          ...state,
          content: data
        }
      }
    case "RESET_FULFILLED":
      {
        return {
          content: []
        }
      }
  }

  return state
}
