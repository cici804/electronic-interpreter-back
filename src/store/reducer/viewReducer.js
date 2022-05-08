import { UPDATE_VIEW } from '../action/viewAction'

const initialState  = {
  updateViewList: {},
};
// eslint-disable-next-line import/no-anonymous-default-export
const viewReducer = (state = initialState, action) => {
  // console.log("viewReducer" , state, action);
  //Reducer 里只能接收state，不能直接改变state
  switch (action.type) {
    case UPDATE_VIEW:
        return {
            ...state,
            updateViewList: action.list
        }

    default:
        return state
} 
};
export default viewReducer;
