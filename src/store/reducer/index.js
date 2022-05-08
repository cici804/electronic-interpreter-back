import {combineReducers} from 'redux';
import viewReducer from "./viewReducer";
import userReducer from "./userReducer";
import updateFormReducer from "./updateFormReducer";
import myAlertReducer from "./myAlertReducer";
import interpreterReducer from "./interpreterReducer";



const rootReducer = combineReducers({
    viewReducer,
    userReducer,
    updateFormReducer,
    myAlertReducer,
    interpreterReducer
  })
   
export default rootReducer;