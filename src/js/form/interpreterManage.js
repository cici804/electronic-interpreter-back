// 讲解器管理表单
// 景点增加讲解器，设置默认内容、讲解器信息
const myFormAddInterpreterModel = [
  {
    name: "view_id",
    label: "景点ID",
    required: true,
    type: "int",
    value: "",
  },
  {
    name: "publisher_id",
    label: "发布用户id",
    required: true,
    type: "int",
    value: "",
  },
  {
    name: "create_time",
    label: "创建时间",
    required: true,
    type: "input",
    disabled: true,
  },
  {
    name: "content",
    label: "讲解器内容",
    required: true,
    type: "input",
    value: "",
  },
  {
    name: "vedio_url",
    label: "录制音频",
    required: true,
    type: "input",
    value: "",
  },
];
const myFormAddInterpreterFill = [

]