// 用户信息 管理员才能进入
import React, { useState, useEffect } from "react";
// 接口
import $axios from "@src/js/request";
import { useDispatch, useSelector } from "react-redux";
import { updateFormShow } from "@src/store/action/updateFormAction";
import { updateUserAction } from "@src/store/action/userAction";
import { myAlertSet, myAlertShow } from "@src/store/action/myAlertAction";
// 引用表单数据列表
import {
  updateFormUserInfoModel,
  myFormAddUserModel,
  myFormAddUserFill,
} from "@src/js/form/userManage";
import { Row, Select, Table, Button, Modal, Image } from "antd";
// 引用表单公共组件
import MyForm from "../../../../components/MyForm";
import UpdateForm from "../../../../components/UpdateForm";
import style from "@src/less/contentBox.less";
import "@src/less/index.css";
const { Option } = Select;
const myFormAddUserSet = { text: "增加用户", selType: "role" };
const updateFormUserInfoSet = { text: "修改用户信息", selType: "role" };

// 表单列属性
const columns = [
  {
    title: "用户名",
    dataIndex: "username",
    key: "username",
    width: 100,
  },
  {
    title: "昵称",
    dataIndex: "nickname",
    key: "nickname",
    width: 100,
  },
  {
    title: "权限角色",
    dataIndex: "roleID",
    key: "roleID",
    width: 50,
  },
  {
    title: "头像",
    dataIndex: "user_pic",
    key: "user_pic",
    width: 130,
    render: () => {
      return (
        <Image
          width={60}
          height={60}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
      );
    },
  },
  {
    title: "讲解币",
    dataIndex: "coin",
    key: "coin",
    width: 50,
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    width: 200,
    render: () => {
      return (
        <div>
          <TableOperateColumn></TableOperateColumn>
        </div>
      );
    },
  },
];
// table 操作列组件 <TableOperateColumn></TableOperateColumn>
const TableOperateColumn = (props) => {
  // 获取选中数据
  const { updateUserList } = useSelector((state) => ({
    updateUserList: state.userReducer.updateUserList,
  }));
  const [buyList, setBuyList] = useState([]);
  const [recordList, setRecordList] = useState([]);

  // 购物记录表弹窗 显示隐藏
  const [buyModalVisible, setBuyModalVisible] = useState(false);
  // 录制记录表弹窗 显示隐藏
  const [recordModalVisible, setRecordModalVisible] = useState(false);
  const buyTablecolumns = [
    {
      title: "购买时间",
      dataIndex: "create_time",
      key: "create_time",
    },
    {
      title: "讲解器ID",
      dataIndex: "interpreter_id",
      key: "interpreter_id",
    },
  ];
  const recordTablecolumns = [
    {
      title: "录制时间",
      dataIndex: "create_time",
      key: "create_time",
    },
    {
      title: "讲解器ID",
      dataIndex: "interpreter_id",
      key: "interpreter_id",
    },
  ];
  // redux showUpdateForm
  const dispatch = useDispatch();
  // 展示 UpdateForm 弹窗
  const showUpdateForm = () => {
    dispatch(updateFormShow());
  };

  // 关闭购买记录弹窗
  const handleBuyModalCancel = () => {
    setBuyModalVisible(false);
  };

  // 关闭录制记录弹窗
  const handleRecordModalCancel = () => {
    setRecordModalVisible(false);
  };
  // 展示 BuyTable 弹窗
  const showBuyTable = () => {
    console.log("buyList", buyList);
    let buy = updateUserList.buy;
    buy = JSON.parse(buy).res;
    setBuyList(buy);
    if (buyList.length === 0) {
      let list = { msg: "该用户没有购买记录,或者再试一次点击按钮", type: "info" };
      dispatch(myAlertSet(list));
      dispatch(myAlertShow());
    } else {
      setBuyModalVisible(true);
    }
  };
  // 展示 RecordTable 弹窗
  const showRecordTable = () => {
    let record = updateUserList.record;
    record = JSON.parse(record).res;
    setRecordList(record);
    // console.log("recordList", recordList);
    if (recordList.length === 0) {
      let list = { msg: "该用户没有录制记录,或者再试一次点击按钮", type: "info" };
      dispatch(myAlertSet(list));
      dispatch(myAlertShow());
    } else {
      setRecordModalVisible(true);
    }
  };


  return (
    <div>
      <Button size="small" onClick={showUpdateForm} type="primary">
        修改
      </Button>
      <Button size="small" onClick={showBuyTable}>
        购买记录
      </Button>
      <Button size="small" onClick={showRecordTable}>
        录制记录
      </Button>
      <UpdateForm
        updateFormFill={updateUserList}
        updateFormSet={updateFormUserInfoSet}
        updateFormModel={updateFormUserInfoModel}
      ></UpdateForm>
      {/* 购买记录表 */}
      <Modal
        title="购买记录表"
        visible={buyModalVisible}
        onCancel={handleBuyModalCancel}
      >
        <Table
          dataSource={buyList}
          rowKey={"interpreter_id"}
          columns={buyTablecolumns}
          pagination={{ pageSize: 4, position: ["bottomCenter"] }}
        />
      </Modal>
      {/* 录制记录表 */}
      <Modal
        title="录制记录表"
        visible={recordModalVisible}
        onCancel={handleRecordModalCancel}
      >
        <Table
          dataSource={recordList}
          rowKey={"interpreter_id"}
          columns={recordTablecolumns}
          pagination={{ pageSize: 4, position: ["bottomCenter"] }}
        />
      </Modal>
    </div>
  );
};
// 权限角色表弹窗表格列
const rolesTablecolumns = [
  {
    title: "角色id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "角色名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "角色",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "权限列表",
    dataIndex: "menu",
    key: "menu",
    render: (e) => {
      return (
        <div>
          {e.menu &&
            e.menu.map((item, index) => {
              return (
                <div key={item.id}>
                  {index+1}. {item.name}
                </div>
              );
            })}
        </div>
      );
    },
  },
];

const UserInfo = () => {
  // table选中数据
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  //   所有用户数据列表
  const [usersList, setUsersList] = useState([]);
  //   权限角色数据列表
  const [rolesList, setRolesList] = useState([]);
  // 增加用户返回数据
  const [myFormConfirmAddUser, setMyFormConfirmAddUser] = useState({});
  const [rolesModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();

  // table选中 修改、删除景点
  const onSelectChange = (selectedRowKeys, record) => {
    const sel = selectedRowKeys.slice(-1);
    if (selectedRowKeys.length !== 1) {
      // 选择一条 修改、删除同用一个 updateViewAction
      const arr = record.slice(-1);
      dispatch(updateUserAction(arr[0]));
    } else if (selectedRowKeys.length === 1) {
      dispatch(updateUserAction(record[0]));
    }
    setSelectedRowKeys(sel);
  };
  // 表格选择框
  const rowSelection = {
    selectedRowKeys: selectedRowKeys,
    onChange: onSelectChange,
  };
  //   弹窗显示隐藏
  const showModal = () => {
    setIsModalVisible(true);
  };
  // 弹窗确认
  const handleOk = () => {
    setIsModalVisible(false);
  };
  // 弹窗取消
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  //   查询所有用户数据
  const getUsersList = async () => {
    const result = await $axios.getRequest("/my/usersinfo");
    if (result.status === 0) {
      setUsersList(result.data);
    }
  };
  //   查询所有权限角色数据
  const getRolesList = async () => {
    const result = await $axios.getRequest("/roles/rolesInfo");
    if (result.status === 0) {
      let arr = result.data;
      for (let i of arr) {
        i.menu = JSON.parse(i.menu);
      }
      setRolesList(result.data);
    }
  };
  // 选择框 根据用户名获取用户信息数据接口
  const selectHandleChange = async (s) => {
    let data = { username: s };
    const result = await $axios.postRequest("/my/userinfo/search", data);
    if (result.status === 0) {
      setUsersList(result.data);
    }
  };
  // 接收表单数据
  useEffect(() => {
    // 添加用户
    const AddView = async () => {
      if (JSON.stringify(myFormConfirmAddUser) !== "{}") {
        const result = await $axios.postRequest(
          "/my/adduser",
          myFormConfirmAddUser
        );
        if (result.status === 0) {
          console.log("添加用户成功！");
          getUsersList();
        } else if (result.status === 1) {
          console.log("添加用户失败！");
        }
      }
    };
    AddView();
  }, [myFormConfirmAddUser]);
  // 初次渲染获取城市 景点数据
  useEffect(() => {
    getUsersList();
    getRolesList();
  }, []);
  return (
    <Row className={style.contentBox}>
      {/* 顶部工具栏 按城市搜索景点 增加景点 增加城市 */}
      <div>
        <Select
          style={{ width: 180, margin: "10px" }}
          allowClear={true}
          placeholder="按照用户名搜索"
          onSelect={selectHandleChange}
          onClear={getUsersList}
        >
          {usersList.map((item) => (
            <Option value={item.username} key={item.id}>
              {item.username}
            </Option>
          ))}
        </Select>

        <MyForm
          myFormConfirm={setMyFormConfirmAddUser}
          myFormSet={myFormAddUserSet}
          myFormModel={myFormAddUserModel}
          myFormFill={myFormAddUserFill}
        ></MyForm>
        <Button type="link" onClick={showModal}>
          权限角色表
        </Button>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={usersList}
        rowKey={"id"}
        className={style.antSpinContainer}
        pagination={{ pageSize: 5, position: ["bottomCenter"] }}
      />
      {/* 权限角色表 */}
      <Modal
        title="权限角色表"
        visible={rolesModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width="50%"
      >
        <Table
          dataSource={rolesList}
          rowKey={"id"}
          columns={rolesTablecolumns}
          pagination={{ pageSize: 4, position: ["bottomCenter"] }}
        />
      </Modal>
    </Row>
  );
};

export default UserInfo;
