export default function reducer(state = {
  content: []
}, action)
{
  switch (action.type)
  {
    case "MAIL_VIEW":
      {
        let data = state.content.slice()
        data.push(action.payload.data)

        //if( JSON.stringify(data).includes(JSON.stringify(action.payload)) )
        return {
          ...state,
          content: data
        }
      }
  }

  return state
}
