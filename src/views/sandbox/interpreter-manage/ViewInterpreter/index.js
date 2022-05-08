// 通过景点id管理讲解器 景点管理人员进入 管理员也能进入
import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
// 接口
import $axios from "@src/js/request";
import { Row, Col, Form, Input, Button, InputNumber } from "antd";
import moment from "moment";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
// 引用表单公共组件
import style from "@src/less/contentBox.less";
import "./index.css";
// import { myAlertSet, myAlertShow } from "@src/store/action/myAlertAction";
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
};
const formItemLayoutWithOutLabel = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
};
const ViewInterpreter = () => {
  const [commitList, setCommitList] = useState({});
  // 获取manageInterpreter传来的值（updateInterpreterList）
  const location = useLocation()
  const [form] = Form.useForm();

  const fillForm =  () => {
    if (location.state !== null) {
      const updateInterpreterList = location.state.updateInterpreterList;
      console.log(updateInterpreterList)
      form.setFieldsValue({
        view_id: updateInterpreterList.view_id,
        publisher_id: updateInterpreterList.publisher_id,
        create_time: updateInterpreterList.create_time,
      });
    }
  };
  useEffect(() => {
    fillForm();
  }, [location]);
  
  
  const onFinish = (values) => {
    let date = moment().format("YYYY-MM-DD HH:mm");
    values.create_time = date;
    values.vedio_url = 'null';
    values.is_delete = 0;
    let obj = {...values.content};
    obj = JSON.stringify(obj);
    values.content = obj;
    setCommitList(values);
  };
  useEffect(() => {
    const addInterpreter = async () => {
      if (JSON.stringify(commitList) !== "{}") {
        console.log(commitList)
        const result = await $axios.postRequest("/interpreter/add", commitList);
        console.log("result", result);
      }
    };
    addInterpreter();
  }, [commitList]);

  return (
    // 景点ID view_id 发布用户ID publisher_id 创建时间 create_time
    <Row className={style.contentBox}>
      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <Row>
          <Col span={8}>
            <Form.Item
              {...formItemLayout}
              name="view_id"
              label="景点ID"
              rules={[{ required: true, message: "请填写景点ID" }]}
            >
              <InputNumber min={1} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              {...formItemLayout}
              name="publisher_id"
              label="发布用户ID"
              rules={[{ required: true, message: "请填写您的用户ID" }]}
            >
              <InputNumber min={1} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item {...formItemLayout} name="create_time" label="创建时间">
              <Input placeholder="自动填写提交时的时间" disabled />
            </Form.Item>
          </Col>
        </Row>

        <Form.List name="content">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Row key={key}>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      {...formItemLayoutWithOutLabel}
                      name={[name, "detail_title"]}
                      label="标题"
                      rules={[{ required: true, message: "请填写内容" }]}
                    >
                      <Input placeholder="讲解器小标题" />
                    </Form.Item>
                  </Col>
                  <Col span={15}>
                    <Form.Item
                      {...restField}
                      {...formItemLayoutWithOutLabel}
                      name={[name, "detail_content"]}
                      label="内容"
                      rules={[{ required: true, message: "请填写内容" }]}
                    >
                      <TextArea placeholder="详细内容" />
                    </Form.Item>
                  </Col>
                  <Col span={1}>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  增加讲解新章节
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="submit-btn">
            提交
          </Button>
        </Form.Item>
      </Form>
    </Row>
  );
};

export default ViewInterpreter;
