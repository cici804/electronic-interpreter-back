// 景点删除历史 管理员才能进入
import React, { useState, useEffect } from "react";
// 接口
import $axios from "@src/js/request";
import { Row, Table, Button } from "antd";
import style from "@src/less/contentBox.less";
import "@src/less/index.css";

const ViewDeleteHistroy = () => {
  const [viewsDeletedList, setViewsDeletedList] = useState([]);
  // table选中数据
  const [selectedRowKey, setSelectedRowKey] = useState([]);
  // 表单列属性
  const columns = [
    {
      title: "景点名",
      dataIndex: "view_name",
      key: "view_name",
      width: 100,
    },
    {
      title: "地点",
      dataIndex: "location",
      key: "location",
      width: 120,
    },
    {
      title: "城市",
      dataIndex: "cityname",
      key: "cityname",
      width: 80,
    },
    {
      title: "开放时间",
      dataIndex: "opentime",
      key: "opentime",
      width: 150,
    },
    {
      title: "介绍",
      dataIndex: "detail",
      key: "detail",
      width: 600,
    },
    {
      title: "操作",
      dataIndex: "operation",
      key: "operation",
      width: 150,
      render: () => <Button onClick={recoverDeletedView}>恢复</Button>,
    },
  ];
  // table选中 修改、删除景点
  const onSelectChange = (selectedRowKey) => {
      if (selectedRowKey.length !== 1) {
        const sel = selectedRowKey.slice(-1)
        setSelectedRowKey(sel);
      } else {
        setSelectedRowKey(selectedRowKey);
      }
  };

  const recoverDeletedView = async () => {
    // 恢复删除景点 接口
    const id = selectedRowKey[0];
    const result = await $axios.delRequest(
      `/views/deleteView/0/${id}`
    );
    if (result.status === 0) {
      console.log("恢复成功",result);
    } else {
      console.log("err");
    }
  };

  //  获取已删除的景点信息接口
  // 接收表单数据
  useEffect(() => {
    // 添加景点
    const getViewsDeletedList = async () => {
      const result = await $axios.getRequest("/views/viewDeleted");
      if (result.status === 0) {
        setViewsDeletedList(result.data);
      }
    };
    getViewsDeletedList();
  }, [viewsDeletedList]);

  // 表格选择框
  const rowSelection = {
    selectedRowKeys: selectedRowKey,
    onChange: onSelectChange,
  };
  return (
    <Row className={style.contentBox}>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={viewsDeletedList}
        rowKey={"id"}
        className={style.antSpinContainer}
        pagination={{ pageSize: 4, position: ["bottomCenter"] }}
      />
    </Row>
  );
};

export default ViewDeleteHistroy;
