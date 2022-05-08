// 管理讲解器 （增删改查） 管理人员进入
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// 接口
import $axios from "@src/js/request";
import { updateInterpreterAction } from "@src/store/action/interpreterAction";
import { myAlertSet, myAlertShow } from "@src/store/action/myAlertAction";
import { Row, Input, Table, Button, Modal } from "antd";
// 引用表单公共组件
import style from "@src/less/contentBox.less";
import "@src/less/index.css";

const { Search } = Input;
// 表单列属性
const columns = [
  {
    title: "景点ID",
    dataIndex: "view_id",
    key: "view_id",
    width: 100,
  },
  {
    title: "讲解音频",
    dataIndex: "vedio_url",
    key: "vedio_url",
    width: 150,
  },
  {
    title: "发布者ID",
    dataIndex: "publisher_id",
    key: "publisher_id",
    width: 80,
  },
  {
    title: "点击量",
    dataIndex: "hits",
    key: "hits",
    width: 100,
  },
  {
    title: "创建时间",
    dataIndex: "create_time",
    key: "create_time",
    width: 100,
  },
  {
    title: "操作",
    dataIndex: "operate",
    key: "operate",
    width: 200,
    render: () => <TableOperateColumn></TableOperateColumn>,
  },
];
// table 操作列组件 <TableOperateColumn></TableOperateColumn>
const TableOperateColumn = () => {
  const [delMsg, setDelMsg] = useState("未选中数据");

  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // 获取选中数据
  const { updateInterpreterList } = useSelector((state) => ({
    updateInterpreterList: state.interpreterReducer.updateInterpreterList,
  }));
  useEffect(() => {
    let m = updateInterpreterList.is_delete === 0 ? "删除" : "恢复";
    setDelMsg(m);
  }, [updateInterpreterList]);
  // 修改讲解器内容
  const handleEdit = () => {
    navigate("/admin/interpreter_manage/viewInterpreter", {
      state: { updateInterpreterList: updateInterpreterList },
    });
  };
  // 点击table操作栏 删除 按钮
  const handleDelete = () => {
    setModalVisible(true);
  };
  const handleCancel = () => {
    setModalVisible(false);
  };
  const handleOk = async () => {
    if (updateInterpreterList.is_delete === 0) {
      // 删除
      const result = await $axios.delRequest(
        `/interpreter/delete/1/${updateInterpreterList.id}`
      );
      let list =
        result.status === 0
          ? { msg: "删除成功，请刷新页面", type: "success" }
          : { msg: "删除失败，看一下有选中数据吗", type: "error" };
      dispatch(myAlertSet(list));
      dispatch(myAlertShow());
    } else if (updateInterpreterList.is_delete === 1) {
      // 恢复
      const result = await $axios.delRequest(
        `/interpreter/delete/0/${updateInterpreterList.id}`
      );
      let list =
        result.status === 0
          ? { msg: "恢复成功，请刷新页面", type: "success" }
          : { msg: "恢复失败，看一下有选中数据吗", type: "error" };
      dispatch(myAlertSet(list));
      dispatch(myAlertShow());
    }
    setModalVisible(false);
  };
  return (
    <div>
      <Button size="small" onClick={handleEdit}>
        编辑
      </Button>
      <Button size="small" danger onClick={handleDelete}>
        删除(恢复)
      </Button>
      <Modal
        title={delMsg}
        visible={modalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        是否{delMsg}讲解器?
      </Modal>
    </div>
  );
};
const ManageInterpreter = () => {
  const [interpreterList, setInterpreterList] = useState([]);
  const [viewId, setViewId] = useState();
  // table选中数据
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const dispatch = useDispatch();

  // table选中 修改、删除景点
  const onSelectChange = (selectedRowKeys, record) => {
    const sel = selectedRowKeys.slice(-1);
    if (selectedRowKeys.length !== 1) {
      // 选择一条 修改、删除同用一个 updateViewAction
      const arr = record.slice(-1);
      dispatch(updateInterpreterAction(arr[0]));
    } else if (selectedRowKeys.length === 1) {
      dispatch(updateInterpreterAction(record[0]));
    }
    setSelectedRowKeys(sel);
  };
  const onSearch = (value) => {
    try {
      // 判断输入景点ID是否为number类型，不是的话使用MyAlert提示用户
      let tmp = value;
      if (typeof JSON.parse(tmp) == "number") {
        setViewId(value);
      }
    } catch (err) {
      let list = { msg: "输入景点ID有误，请检查！", type: "error" };
      dispatch(myAlertSet(list));
      dispatch(myAlertShow());
    }
  };

  useEffect(() => {
    // 根据 景点ID 获取讲解器数据
    const getInterpreterList = async () => {
      let data = { view_id: viewId };
      const result = await $axios.postRequest(
        "/interpreter/infoByViewId",
        data
      );
      if (result.status === 0) {
        // console.log(JSON.parse(result.data[3].content));
        setInterpreterList(result.data);
      } else if (result.status === 1) {
        setInterpreterList([]);
      }
    };
    getInterpreterList();
  }, [viewId]);
  // 表格选择框
  const rowSelection = {
    selectedRowKeys: selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <Row className={style.contentBox}>
      <div style={{ padding: "10px" }}>
        <Search
          placeholder="请输入景点ID"
          onSearch={onSearch}
          style={{ width: 200 }}
        />
      </div>
      <Table
        rowSelection={rowSelection}
        dataSource={interpreterList}
        rowKey={"id"}
        columns={columns}
        pagination={{ pageSize: 4, position: ["bottomCenter"] }}
        className={style.antSpinContainer}
      />
    </Row>
  );
};

export default ManageInterpreter;
