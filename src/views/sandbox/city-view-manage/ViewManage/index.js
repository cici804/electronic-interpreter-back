// 管理城市-景点 管理员才能进入
import React, { useState, useEffect } from "react";
// 接口
import $axios from "@src/js/request";
import { useDispatch, useSelector } from "react-redux";
import { updateViewAction } from "@src/store/action/viewAction";
import { updateFormShow } from "@src/store/action/updateFormAction";
import { myAlertSet, myAlertShow } from "@src/store/action/myAlertAction";
// 引用表单数据列表
import {
  myFormAddViewModel,
  myFormAddViewFormFill,
  updateFormViewModel,
  myFormAddCityModel,
  myFormAddCityFormFill,
} from "@src/js/form/viewManage";
import { Row, Select, Table, Button } from "antd";
// 引用表单公共组件
import MyForm from "@src/components/MyForm";
import UpdateForm from "../../../../components/UpdateForm";
import style from "@src/less/contentBox.less";
import "@src/less/index.css";
const { Option } = Select;

// 上方工具栏 选择城市框提示语
const selectPlaceholde = "根据城市查询景点";
// 传入 MyForm 组件参数 myFormSet updateFormSet
const myFormAddViewSet = { text: "添加景点", selType: "city" };
const myFormAddCitySet = { text: "添加城市" };
const updateFormUpdateViewSet = { text: "修改景点", selType: "city" };
// 表单列属性
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: 60,
  },
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
    render: () => <TableOperateColumn></TableOperateColumn>,
  },
];
// table 操作列组件 <TableOperateColumn></TableOperateColumn>
const TableOperateColumn = () => {
  // 获取选中数据
  const { updateViewList } = useSelector((state) => ({
    updateViewList: state.viewReducer.updateViewList
  }));
  // redux showUpdateForm
  const dispatch = useDispatch();
  // 展示 UpdateForm 弹窗
  const showUpdateForm = () => {
    dispatch(updateFormShow());
  };
  // 删除景点 接口
  const deleteView = async () => {
    const result = await $axios.delRequest(
      `/views/deleteView/1/${updateViewList.id}`
    );

    let list = result.status === 0 ? { msg: "成功，请刷新页面", type: "success" } : { msg: "失败，看一下有选中数据吗", type: "error" };
    dispatch(myAlertSet(list));
    dispatch(myAlertShow());
  };
  return (
    <div>
      <Button size="small" onClick={showUpdateForm}>
        修改
      </Button>
      <Button type="primary" size="small" danger onClick={deleteView}>
        删除
      </Button>
      <UpdateForm
        updateFormFill={updateViewList}
        updateFormSet={updateFormUpdateViewSet}
        updateFormModel={updateFormViewModel}
      ></UpdateForm>
    </div>
  );
};

// ！景点管理 组件
const ViewManage = () => {
  // 增加景点 增加城市 MyForm组件点击 确认 提交的数据
  const [myFormConfirmAddView, setMyFormConfirmAddView] = useState({});
  const [myFormConfirmAddCity, setMyFormConfirmAddCity] = useState({});
  // table选中数据
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  // 接口 get 的数据
  const [viewsList, setViewList] = useState([]);
  const [cityList, setCityList] = useState([]);
  
  const dispatch = useDispatch();

  // table选中 修改、删除景点
  const onSelectChange = (selectedRowKeys, record) => {
    const sel = selectedRowKeys.slice(-1)
    if (selectedRowKeys.length !== 1) {
      // 选择一条 修改、删除同用一个 updateViewAction
      const arr = record.slice(-1)
      dispatch(updateViewAction(arr[0]));
    } else if (selectedRowKeys.length === 1) {
      dispatch(updateViewAction(record[0]));
    }
    setSelectedRowKeys(sel);
  };

  // 获取所有景点数据接口
  const getViewsList = async () => {
    const result = await $axios.getRequest("/views/viewInfo");
    if (result.status === 0) {
      setViewList(result.data);
    }
  };
  // 获取所有城市数据接口
  const getCityList = async () => {
    const result = await $axios.getRequest("/city/cityInfo");
    if (result.status === 0) {
      setCityList(result.data);
      myFormAddViewModel[2].options = result.data;
      updateFormViewModel[3].options = result.data;
    }
  };
  // 选择框 根据城市id获取景点数据接口
  const selectHandleChange = async (c) => {
    let data = { cityid: c };
    const result = await $axios.postRequest("/views/viewInfoByCityId", data);
    if (result.status === 0) {
      setViewList(result.data);
    }
  };
  // 接收表单数据
  useEffect(() => {
    // 添加景点
    const AddView = async () => {
      if (JSON.stringify(myFormConfirmAddView) !== "{}") {
        const result = await $axios.postRequest(
          "/views/addView",
          myFormConfirmAddView
        );
        if (result.status === 0) {
          getViewsList();
        } else if (result.status === 1) {
        }
      }
    };
    AddView();
  }, [myFormConfirmAddView]);
  useEffect(() => {
    // 添加城市
    const AddCity = async () => {
      if (JSON.stringify(myFormConfirmAddCity) !== "{}") {
        console.log(myFormConfirmAddCity)
        const result = await $axios.postRequest(
          "/city/add",
          myFormConfirmAddCity
        );
        if (result.status === 0) {
          getCityList();
        } else if (result.status === 1) {
        }
      }
    };
    AddCity();
  }, [myFormConfirmAddCity]);
  // 初次渲染获取城市 景点数据
  useEffect(() => {
    getViewsList();
    getCityList();
  }, []);

  // 表格选择框
  const rowSelection = {
    selectedRowKeys: selectedRowKeys,
    onChange: onSelectChange,
    // selections: [
    //   Table.SELECTION_ALL,
    //   Table.SELECTION_INVERT,
    //   Table.SELECTION_NONE,
    // ],
  };
  return (
    <Row className={style.contentBox}>
      {/* 顶部工具栏 按城市搜索景点 增加景点 增加城市 */}
      <div>
        <Select
          style={{ width: 180, margin: "10px" }}
          allowClear={true}
          placeholder={selectPlaceholde}
          onSelect={selectHandleChange}
          onClear={getViewsList}
        >
          {cityList.map((item) => (
            <Option value={item.id} key={item.id}>
              {item.cityname}
            </Option>
          ))}
        </Select>
        {/* 弹窗表单 */}
        <MyForm
          myFormConfirm={setMyFormConfirmAddView}
          myFormSet={myFormAddViewSet}
          myFormModel={myFormAddViewModel}
          myFormFill={myFormAddViewFormFill}
        ></MyForm>
        <MyForm
          myFormSet={myFormAddCitySet}
          myFormModel={myFormAddCityModel}
          myFormFill={myFormAddCityFormFill}
          myFormConfirm={setMyFormConfirmAddCity}
        ></MyForm>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={viewsList}
        rowKey={"id"}
        className={style.antSpinContainer}
        pagination={{ pageSize: 4, position: ["bottomCenter"] }}
      />
    </Row>
  );
};

export default ViewManage;
