// 公共表单组件
// 父 -> 子 fatherList  子 -> 父 sonList
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserInfo } from "@src/store/action/userAction";
import { updateView } from "@src/store/action/viewAction";

import { updateFormHide } from "@src/store/action/updateFormAction";
import {
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  DatePicker,
  Button,
  Image
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
    offset: 10,
    span: 14,
  },
};

const UpdateForm = (props) => {
  // ! modal
  // 表单数据项
  const formModel = props.updateFormModel;
  // type(1,0)[按钮类型是否为danger] text[按钮文字] selType[city,]选择框
  const formSet = props.updateFormSet;
  // 表单数据
  const formFill = props.updateFormFill;
  // redux 弹窗显示隐藏 数据
  const { updateFormVisible } = useSelector((state) => ({
    updateFormVisible: state.updateFormReducer.updateFormVisible,
  }));
  const dispatch = useDispatch();
  const handleCancel = () => {
    dispatch(updateFormHide());
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
        return <InputNumber style={{ width: "100%" }}></InputNumber>;
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
      case "text":
        return (
          <TextArea
            rows={3}
            maxLength={item.maxLength}
            style={{ width: "100%" }}
          />
        );
      case "image":
        return (
          <Image
            width={100}
            height={100}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        );
      case "input":
        return (
          <Input maxLength={item.maxLength} disabled={item.disabled}></Input>
        );
      default:
        return <Input maxLength={item.maxLength}></Input>;
    }
  };
  const onFinish = (values) => {
      // 更新景点接口
    switch (formSet.text) {
      case "修改景点":
        dispatch(updateView(values));
        break;
      case "修改用户信息":
        dispatch(updateUserInfo(values));
        break;
      default: 
        return;
    }
    // 隐藏弹窗
    dispatch(updateFormHide());
  };
  const onFill = () => {
    form.setFieldsValue(formFill);
  };
  return (
    <>
      <Modal
        title={formSet.text}
        visible={updateFormVisible}
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
            <Button type="link" htmlType="button" onClick={onFill}>
              自动填充
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateForm;
