import { STOP_EVENT } from "../current/currentDucks";

// Actions
const HISTORY_RESET = 'HISTORY_RESET'
const HISTORY_DELETE_EVENT = 'HISTORY_DELETE_EVENT'

// Actions creators
export const resetHistory = () => ({
  type: HISTORY_RESET
})

export const deleteEvent = (date, id) => ({
  type: HISTORY_DELETE_EVENT,
  payload: { date, id }
})

// Selectors

// Sagas

// Reducer

const initalState = {}

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case STOP_EVENT: {
      if (!action.payload) return initalState;
      const startAsDate = new Date(action.payload.start)
      const date = new Date(startAsDate.getFullYear(), startAsDate.getMonth(), startAsDate.getDate())
      const prevEvents = state[date] || []
      return {
        ...state,
        [date]: [
          ...prevEvents,
          {
            ...action.payload,
            id: Date.now()
          }
        ]
      }
    }
    case HISTORY_DELETE_EVENT: {
      return {
        ...state,
        [action.payload.date]: state[action.payload.date].filter(({ id }) => id !== action.payload.id),
      }
    }
    case HISTORY_RESET: {
      return initalState
    }
    default:
      return state;
  }
}



export default reducer;

