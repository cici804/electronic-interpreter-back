import {
  LineChartOutlined,
  CustomerServiceOutlined,
  UserOutlined,
  ProfileOutlined,
  CompassOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
const MenuList = [
  {
    key: "/home",
    path: "/admin/home",
    title: "介绍我们",
    icon: <ProfileOutlined />,
  },
  {
    key: "/interpreter_manage",
    title: "讲解管理",
    icon: <CustomerServiceOutlined />,
    children: [
      {
        key: "/interpreter_manage/reocord",
        path: "/admin/interpreter_manage/recordInterpreter",
        title: "录制讲解",
        icon: <CustomerServiceOutlined />,
      },
      {
        key: "/interpreter_manage/view",
        path: "/admin/interpreter_manage/viewInterpreter",
        title: "讲解内容",
        icon: <CustomerServiceOutlined />,
      },
      {
        key: "/interpreter_manage/manage",
        path: "/admin/interpreter_manage/manageInterpreter",
        title: "管理讲解",
        icon: <CustomerServiceOutlined />,
      },
    ],
  },
  {
    key: "/city_view_manage",
    title: "景点管理",
    icon: <CompassOutlined />,
    children: [
      {
        key: "/city_view_manage/viewManage",
        path: "/admin/city_view_manage/viewManage",
        title: "景点列表",
        icon: <CompassOutlined />,
      },
      {
        key: "/city_view_manage/viewDeleteHistroy",
        path: "/admin/city_view_manage/viewDeleteHistroy",
        title: "删除历史",
        icon: <CompassOutlined />,
      },
    ],
  },
  {
    key: "/user_manage",
    title: "用户管理",
    icon: <UserOutlined />,
    children: [
      {
        key: "/user_manage/userInfo",
        path: "/admin/user_manage/userInfo",
        title: "用户信息",
        icon: <UserOutlined />,
      },
    ],
  },
  {
    key: "/right_manage",
    title: "权限管理",
    icon: <IdcardOutlined />,
    children: [
      {
        key: "/right_manage/roleRight",
        path: "/admin/right_manage/roleRight",
        title: "角色列表",
        icon: <IdcardOutlined />,
      },
    ],
  },
  {
    key: "/charts_show",
    title: "数据展示",
    icon: <LineChartOutlined />,
    children: [
      {
        key: "/charts_show/interpreterShow",
        path: "/admin/charts_show/interpreterShow",
        title: "购买讲解",
        icon: <LineChartOutlined />,
      },
      {
        key: "/charts_show/viewShow",
        path: "/admin/charts_show/viewShow",
        title: "访问景点",
        icon: <LineChartOutlined />,
      },
    ],
  },
];
const UserMenuList = [
  {
    key: "/home",
    path: "/admin/home",
    title: "介绍我们",
    icon: <ProfileOutlined />,
  },
  {
    key: "/interpreter_manage",
    title: "讲解管理",
    icon: <CustomerServiceOutlined />,
    children: [
      {
        key: "/interpreter_manage/reocord",
        path: "/admin/interpreter_manage/recordInterpreter",
        title: "录制讲解",
        icon: <CustomerServiceOutlined />,
      },
    ],
  },
  {
    key: "/charts_show",
    title: "数据展示",
    icon: <LineChartOutlined />,
    children: [
      {
        key: "/charts_show/interpreterShow",
        path: "/admin/charts_show/interpreterShow",
        title: "购买讲解",
        icon: <LineChartOutlined />,
      },
      {
        key: "/charts_show/viewShow",
        path: "/admin/charts_show/viewShow",
        title: "访问景点",
        icon: <LineChartOutlined />,
      },
    ],
  },
];
const ViewMenuList = [
  {
    key: "/home",
    path: "/admin/home",
    title: "介绍我们",
    icon: <ProfileOutlined />,
  },
  {
    key: "/interpreter_manage",
    title: "讲解管理",
    icon: <CustomerServiceOutlined />,
    children: [
      {
        key: "/interpreter_manage/reocord",
        path: "/admin/interpreter_manage/recordInterpreter",
        title: "录制讲解",
        icon: <CustomerServiceOutlined />,
      },
      {
        key: "/interpreter_manage/view",
        path: "/admin/interpreter_manage/viewInterpreter",
        title: "讲解内容",
        icon: <CustomerServiceOutlined />,
      },
    ],
  },
  {
    key: "/charts_show",
    title: "数据展示",
    icon: <LineChartOutlined />,
    children: [
      {
        key: "/charts_show/interpreterShow",
        path: "/admin/charts_show/interpreterShow",
        title: "购买讲解",
        icon: <LineChartOutlined />,
      },
      {
        key: "/charts_show/viewShow",
        path: "/admin/charts_show/viewShow",
        title: "访问景点",
        icon: <LineChartOutlined />,
      },
    ],
  },
];
export { MenuList, UserMenuList, ViewMenuList };
