// 公共表单组件
// 父 -> 子 fatherList  子 -> 父 sonList
import React, { useState } from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  Select,
  InputNumber,
  DatePicker,
} from "antd";
const { Option } = Select;
const { TextArea } = Input;
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
// ! MyForm组件
const MyForm = (props) => {
  const [visible, setVisible] = useState(false);
  // 表单数据项
  const formModel = props.myFormModel;
  // 填充表单数据
  const fillForm = props.myFormFill || {};
  // type(1,0)[按钮类型是否为danger] text[按钮文字] selType[city,]选择框
  const formSet = props.myFormSet;
  // ! modal
  const showModal = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  // ! 表单
  const [form] = Form.useForm();
  // 获取选择框的值
  const changeSelect = (value, e) => {
    if (formSet.selType === "city") {
      form.setFieldsValue({
        cityid: JSON.parse(e.key),
      });
    }
  };
  // 判断该行是输入什么类型的数据
  const switchItem = (item) => {
    const type = item.type;
    switch (type) {
      case "int":
        return <InputNumber style={{ width: "100%" }} disabled={item.disabled}></InputNumber>;
      case "date":
        return <DatePicker style={{ width: "100%" }}></DatePicker>;
      case "selectCity":
        return (
          <Select onChange={changeSelect}>
            {item.options.map((option) => {
              return (
                <Option key={option.id} value={option.cityname}>
                  {option.cityname}
                </Option>
              );
            })}
          </Select>
        );
        case "selectRole":
        return (
          <Select onChange={changeSelect}>
            {item.options.map((option) => {
              return (
                <Option key={option.roleID} value={option.roleID}>
                  {option.name}
                </Option>
              );
            })}
          </Select>
        );
      case "text":
        return (
          <TextArea
            rows={3}
            maxLength={item.maxLength}
            style={{ width: "100%" }}
          />
        );
      default:
        return <Input maxLength={item.maxLength} minLength={item.minLength} disabled={item.disabled}></Input>;
    }
  };

  const onFinish = (values) => {
    // 将表单确认的数据发送给父组件
    props.myFormConfirm(values);
    setVisible(false);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue(fillForm);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        {formSet.text}
      </Button>

      <Modal
        title={formSet.text}
        visible={visible}
        onCancel={handleCancel}
        footer={[]}
      >
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
          {formModel.map((item, index) => {
            return (
              <Form.Item
                key={index}
                name={item.name}
                label={item.label}
                rules={[
                  {
                    required: item.required,
                  },
                ]}
                hidden={item.hidden}
              >
                {/* {getFieldDecorator(item.field, {
                        initialValue: item.value,
                        rules: [{
                          required: item.required,
                          message: item.errorMessage
                        }],
                      })(
                        this.switchItem(item)
                      )} */}
                {switchItem(item)}
              </Form.Item>
            );
          })}
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              确认
            </Button>
            <Button htmlType="button" onClick={onReset}>
              重置
            </Button>
            <Button type="link" htmlType="button" onClick={onFill}>
              自动填充
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MyForm;
