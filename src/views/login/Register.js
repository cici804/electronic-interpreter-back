// 管理城市-景点 管理员才能进入
import React from 'react';
import { useDispatch } from "react-redux";
import { myAlertSet, myAlertShow } from "@src/store/action/myAlertAction";
import { Link, useNavigate } from 'react-router-dom'
import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.min.css';
import style from './Login.less'
import check from '../../js/check'

// 接口
import $axios from '../../js/request'
// 接口路径
const Url = '/api/reguser'
const Register = () => {
    const dispatch = useDispatch();
    // 登录表单数据
    var state = {
        username: "",
        password: ""
    };
   
    // 登录成功，跳转到home页面
    let navigate = useNavigate();
    const redirect = '/api/login';

    // 点击表单 确认 按钮 value表单数据
    const onFinish = (values) => {
        // 更新loginInfo数据
        state = {
            username: values.username,
            password: values.password
        };       
        //   表单验证
        let checkRes = check.checkLoginInfo(state);
        let list = {msg: checkRes, type: 'warning'};
        dispatch(myAlertSet(list));
        if (checkRes === 'success') {
            registerReq();
        } else {
            dispatch(myAlertShow());
        }
        
    };
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    // 注册接口
    const registerReq = async() => {
        // console.log('confirm:', state);
        const result = await $axios.postRequest(Url, state);
        // console.log('loginRes', result);
        if (result.message.status === 0) {
            navigate(redirect);
        } else {
            let list = {msg: result.message, type: 'error'};
            dispatch(myAlertSet(list));
            dispatch(myAlertShow());
        }
    }
    
    return (
        <div className={style.bg}>
            <div className={style.loginBox}>
                <span className={style.name}>我讲给你听</span>
                <Form
                    name="basic"
                    labelCol={{
                    span: 8,
                    }}
                    wrapperCol={{
                    span: 10,
                    }}
                    initialValues={{
                    remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    className={style.form}
                >
                    <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your username!',
                        },
                    ]}
                    >
                    <Input />
                    </Form.Item>
            
                    <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your password!',
                        },
                    ]}
                    >
                    <Input.Password />
                    </Form.Item>
            
                    <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                    >
                    <Button type="primary" htmlType="submit">
                        注册
                    </Button>
                    <Link to='/login' style={{marginLeft: "20px", borderBottom: "1px solid"}}>返回登录</Link>
                    </Form.Item>
                </Form>
            </div>
        </div>
      
    );
  };

export default Register;