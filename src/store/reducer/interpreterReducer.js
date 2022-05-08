import { UPDATE_INTERPRETER } from '../action/interpreterAction'

const initialState  = {
  updateInterpreterList: {},
};
const interpreterReducer = (state = initialState, action) => {
  // console.log("interpreterReducer" + state, action);
  switch (action.type) {
    case UPDATE_INTERPRETER:
        return {
            ...state,
            updateInterpreterList: action.list
        }

    default:
        return state
} 
};
export default interpreterReducer;
