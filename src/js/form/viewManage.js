// 增加景点表单
const myFormAddViewModel = [
  {
    name: "view_name",
    label: "景点名",
    required: true,
    errpMseeage: "请输入景点名",
    type: "input",
    value: "",
  },
  {
    name: "location",
    label: "位置",
    required: true,
    errpMseeage: "请输入位置",
    type: "input",
    value: "",
  },
  // city 包括cityid,cityname，options需填入
  {
    name: "cityname",
    label: "城市",
    required: true,
    errpMseeage: "请输入城市",
    type: "selectCity",
    value: "",
    options: [],
  },
  {
    name: "cityid",
    label: "城市id",
    type: "int",
    hidden: true,
  },

  {
    name: "opentime",
    label: "开放时间",
    required: false,
    errpMseeage: "请输入开放时间",
    type: "input",
    value: "",
    maxLength: 20,
  },
  {
    name: "detail",
    label: "景点介绍",
    required: true,
    errpMseeage: "请输入景点介绍",
    type: "text",
    value: "",
    maxLength: 130,
  },
  {
    name: "is_delete",
    label: "删除",
    value: 0,
    type: "int",
    hidden: true,
  },
];
const myFormAddViewFormFill = {
  view_name: "故宫博物馆",
  location: "东城区景山前街4号",
  city: "请选择城市名",
  opentime: "开馆时间为08:30，停止入院时间为15:40，闭馆时间为16:30",
  detail:
    "故宫博物院是在明、清两代皇宫及其收藏的基础上建立起来的中国综合性博物馆。其位于北京市中心，前通天安门，后倚景山，东近王府井街市，西临中南海。1961年，经国务院批准，故宫被定为全国第一批重点文物保护单位。1987年，故宫被联合国教科文组织列入“世界文化遗产”名录。",
};

const updateFormViewModel = [
  {
    name: "id",
    label: "景点id",
    required: true,
    errpMseeage: "景点id缺失",
    type: "input",
    value: "",
    disabled: true
  },
  {
    name: "view_name",
    label: "景点名",
    required: true,
    errpMseeage: "请输入景点名",
    type: "input",
    value: "",
    disabled: true
  },
  {
    name: "location",
    label: "位置",
    required: true,
    errpMseeage: "请输入位置",
    type: "input",
    value: "",
  },
  // city 包括cityid,cityname，options需填入
  {
    name: "cityname",
    label: "城市",
    required: true,
    errpMseeage: "请输入城市",
    type: "selectCity",
    value: "",
    options: [],
  },
  {
    name: "cityid",
    label: "城市id",
    type: "int",
    hidden: true,
  },
  {
    name: "opentime",
    label: "开放时间",
    required: false,
    errpMseeage: "请输入开放时间",
    type: "input",
    value: "",
  },
  {
    name: "detail",
    label: "景点介绍",
    required: true,
    errpMseeage: "请输入景点介绍",
    type: "text",
    value: "",
  },
  {
    name: "is_delete",
    label: "删除",
    type: "int",
    hidden: true,
  },
];
const myFormAddCityModel = [
  {
    name: "cityname",
    label: "城市名",
    required: true,
    errpMseeage: "请输入城市名",
    type: "input",
    value: "",
  },
  {
    name: "country",
    label: "所属国家",
    required: true,
    errpMseeage: "请输入所属国家",
    type: "input",
    value: "中国",
  },
];
const myFormAddCityFormFill = {
  cityname: "北京",
  country: "中国",
};
export {
  myFormAddViewModel,
  myFormAddViewFormFill,
  updateFormViewModel,
  myFormAddCityModel,
  myFormAddCityFormFill,
};
