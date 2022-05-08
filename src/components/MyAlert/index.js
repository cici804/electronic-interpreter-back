/**
 * 顶部Alert 使用：
import { useDispatch } from "react-redux";
import { myAlertSet, myAlertShow } from "@src/store/action/myAlertAction";

const dispatch = useDispatch();
let list = {msg: ?, type: '?'};
let list = result.status === 0 ? { msg: "成功，请刷新页面", type: "success" } : { msg: "失败，看一下有选中数据吗", type: "error" };
dispatch(myAlertSet(list));
dispatch(myAlertShow());
 */

import React from "react";
import { Alert } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { myAlertHide } from "@src/store/action/myAlertAction";

const MyAlert = () => {
  const { myAlertList, myAlertVisible } = useSelector((state) => ({
    myAlertList: state.myAlertReducer.myAlertList,
    myAlertVisible: state.myAlertReducer.myAlertVisible,
  }));
  const dispatch = useDispatch();
  if (myAlertVisible === true) {
    setTimeout(() => {
      dispatch(myAlertHide());
    }, 2000);
  }

  return (
    <div style={{ display: myAlertVisible ? "block" : "none" }}>
      <Alert
        message={myAlertList.msg}
        type={myAlertList.type}
        showIcon
        closable
      />
    </div>
  );
};

export default MyAlert;
