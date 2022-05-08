import $axios from "@src/js/request";
export const UPDATE_USER = "UPDATE_USER";


// ! 用户管理模块
// 更新选中用户信息 用于修改用户数据
export const updateUserAction = (list) => ({
  type: "UPDATE_USER",
  list,
});

// 修改用户数据接口
export const updateUserInfo = (msg) => {
  return (dispatch) => {
    $axios.postRequest("/my/userinfo", msg)
      .then((res) => {
        console.log('updateUser res', res);
      })
      .catch((err) => {
          console.log('updateUser error', err);
      });
  };
};