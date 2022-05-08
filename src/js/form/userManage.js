// 用户管理表单
const updateFormUserInfoModel = [
  {
    name: "id",
    label: "用户id",
    required: true,
    type: "input",
    value: "",
    disabled: true,
  },
  {
    name: "username",
    label: "用户名",
    required: true,
    errpMseeage: "请输入用户名",
    type: "input",
    value: "",
    disabled: true,
  },
  {
    name: "nickname",
    label: "昵称",
    required: true,
    errpMseeage: "请输入昵称",
    type: "input",
    value: "",
  },
  {
    name: "roleID",
    label: "权限角色",
    required: true,
    type: "int",
    disabled: true,
  },
  {
    name: "coin",
    label: "讲解币",
    errpMseeage: "请输入讲解币数量",
    type: "int",
  },
];
const myFormAddUserModel = [
  {
    name: "username",
    label: "用户名",
    required: true,
    errpMseeage: "请输入用户名",
    type: "input",
    value: "",
    maxLength: 10,
  },
  {
    name: "password",
    label: "密码",
    required: true,
    errpMseeage: "请输入密码",
    type: "pwd",
    value: "",
    maxLength: 12,
    minLength: 6,
  },
  {
    name: "nickname",
    label: "昵称",
    required: true,
    errpMseeage: "请输入昵称",
    type: "input",
    value: "",
  },
  
  {
    name: "roleID",
    label: "权限角色",
    required: true,
    type: "int",
    disabled: true,
  },
  {
    name: "coin",
    label: "讲解币",
    type: "int",
    disabled: true,
  },
];
const myFormAddUserFill = {
  username: "xxx",
  nickname: "不知名靓仔",
  password: "",
  roleID: 3,
  coin: 0,
};
export { updateFormUserInfoModel, myFormAddUserModel, myFormAddUserFill };
