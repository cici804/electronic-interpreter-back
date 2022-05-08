import React from "react";
import { NavLink } from "react-router-dom";
// 接口
import $axios from "@src/js/request";
import util from "../../js/util";
import { Menu } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import style from "./index.less";

// 引入侧边栏配置
import { MenuList, UserMenuList, ViewMenuList } from "../../js/menuConfig";
const { SubMenu } = Menu;

class index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  getRoleIDByUsername = async () => {
    const userInfo = util.getStorage("userInfo");
    let data = { username: userInfo.username };
    const result = await $axios.postRequest("/my/userinfo/search", data);
    if (result.status === 0) {
      const roleID = result.data[0].roleID;
      let MenuConfig = [];
      if (roleID === 1) {
        MenuConfig = MenuList;
      } else if (roleID === 2) {
        MenuConfig = ViewMenuList;
      } else {
        MenuConfig = UserMenuList;
      }
      const menuTreeNode = this.renderMenu(MenuConfig);
        this.setState({
          menuTreeNode,
        });
    } else {
      console.log("该用户信息不正常！")
    }
    
  };
  // 刷新挂载组件
  componentDidMount() {
    this.getRoleIDByUsername();
  }

  // 菜单渲染
  renderMenu = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <SubMenu title={item.title} key={item.key} icon={item.icon}>
            {this.renderMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item title={item.title} key={item.key} icon={item.icon}>
          <NavLink to={item.path}>{item.title}</NavLink>
        </Menu.Item>
      );
    });
  };
  render() {
    return (
      <div>
        <div className={style.logo}>
          <div className={style.name}>
            我讲给你听
            <PlayCircleOutlined twoToneColor="#009688" />
          </div>
        </div>

        <Menu
          defaultOpenKeys={["/admin/home"]}
          mode="inline"
          className={style.listName}
        >
          {this.state.menuTreeNode}
        </Menu>
      </div>
    );
  }
}

export default index;
