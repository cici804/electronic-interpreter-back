import {
  SHOW_MYALERT,
  HIDE_MYALERT,
  SET_MYALERT,
} from "../action/myAlertAction";

const initialState = {
  myAlertVisible: false,
  myAlertList: { msg: "Hello, welcome to 我讲给你听", type: "info" },
};
const myAlertReducer = (state = initialState, action) => {
    // console.log('myAlertAction', action.list);
  //Reducer 里只能接收state，不能直接改变state
  switch (action.type) {
    case HIDE_MYALERT:
      return {
        ...state,
        myAlertVisible: false,
      };
    case SHOW_MYALERT:
      return {
        ...state,
        myAlertVisible: true,
      };
    case SET_MYALERT:
      return {
        ...state,
        myAlertList: action.list,
      };
    default:
      return state;
  }
};
export default myAlertReducer;
