// import $axios from "@src/js/request";
export const UPDATE_INTERPRETER = "UPDATE_INTERPRETER";


// ! 讲解器管理模块
// 更新选中讲解器信息 用于修改讲解器数据
export const updateInterpreterAction = (list) => ({
  type: "UPDATE_INTERPRETER",
  list,
});

// 修改讲解器数据接口
// export const updateInterpreterInfo = (msg) => {
//   return (dispatch) => {
//     $axios.postRequest("", msg)
//       .then((res) => {
//         console.log('updateInterpreterInfo res', res);
//       })
//       .catch((err) => {
//           console.log('updateInterpreterInfo error', err);
//       });
//   };
// };