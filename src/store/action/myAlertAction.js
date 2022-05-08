export const SHOW_MYALERT = "SHOW_MYALERT";
export const HIDE_MYALERT = "HIDE_MYALERT";
export const SET_MYALERT = "SET_MYALERT";


export const myAlertShow = () => ({
  type: "SHOW_MYALERT",
});
export const myAlertHide = () => ({
  type: "HIDE_MYALERT",
});
export const myAlertSet = (list) => ({
    type: "SET_MYALERT",
    list,
});