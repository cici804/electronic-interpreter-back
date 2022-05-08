import { HIDE_UPDATEFORM, SHOW_UPDATEFORM } from '../action/updateFormAction'

const initialState  = {
  updateFormVisible: false
};
// eslint-disable-next-line import/no-anonymous-default-export
const updateFormReducer = (state = initialState, action) => {
//   console.log("updateFormReducer" , state, action);
  //Reducer 里只能接收state，不能直接改变state
  switch (action.type) {
    case HIDE_UPDATEFORM:
        return {
            ...state,
            updateFormVisible: false
        }
    case SHOW_UPDATEFORM:
        return {
            ...state,
            updateFormVisible: true
        }

    default:
        return state
} 
};
export default updateFormReducer;
