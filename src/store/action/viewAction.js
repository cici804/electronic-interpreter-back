import $axios from "@src/js/request";
export const UPDATE_VIEW = "UPDATE_VIEW";

// ! 景点管理模块
// 更新选中景点信息 用于修改景点数据
export const updateViewAction = (list) => ({
  type: "UPDATE_VIEW",
  list,
});

// 修改景点数据接口
export const updateView = (msg) => {
  return (dispatch) => {
    $axios.postRequest("/views/updateView", msg)
      .then((res) => {
        console.log('updateView res', res);
        // const data = res.data.data;
        // const action = getListAction(data);
        // dispatch(action);
      })
      .catch((err) => {
          console.log('updateView error', err);
      });
  };
};
