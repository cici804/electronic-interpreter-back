import { UPDATE_USER } from '../action/userAction'

const initialState  = {
  updateUserList: {},
};
// eslint-disable-next-line import/no-anonymous-default-export
const userReducer = (state = initialState, action) => {
  // console.log("userReducer" + state, action);
  //Reducer 里只能接收state，不能直接改变state
  switch (action.type) {
    case UPDATE_USER:
        return {
            ...state,
            updateUserList: action.list
        }

    default:
        return state
} 
};
export default userReducer;
