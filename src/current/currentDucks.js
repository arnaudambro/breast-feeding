
// Actions
const START_EVENT = 'START_EVENT';
export const STOP_EVENT = 'STOP_EVENT';
const UPDATE_CHRONO = 'UPDATE_CHRONO';

// Actions creators
export const startEvent = event => ({
  type: START_EVENT,
  payload: event
})

export const updateDuration = duration => ({
  type: UPDATE_CHRONO,
  payload: duration
})

export const stopEvent = (event = null) => ({
  type: STOP_EVENT,
  payload: event
})


// Selectors

// Sagas

// Reducer

const initalState = {
  duration: null,
  breast: null,
  start: null
}

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case START_EVENT: {
      return {
        ...state,
        breast: action.payload,
        start: Date.now()
      }
    }
    case UPDATE_CHRONO: {
      return {
        ...state,
        duration: state.duration + action.payload,
      }
    }
    case STOP_EVENT: {
      return initalState;
    }
    default:
      return state;
  }
}



export default reducer;

