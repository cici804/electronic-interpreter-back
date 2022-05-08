// 管理城市-景点 管理员才能进入
import React, { useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { Form, Input, Button, Checkbox } from 'antd';
import { useDispatch } from "react-redux";
import { myAlertSet, myAlertShow } from "@src/store/action/myAlertAction";
import 'antd/dist/antd.min.css';
import style from './Login.less'
import check from '../../js/check'
import util from '../../js/util'
// 接口
import $axios from '../../js/request'

// 接口路径
const Url = '/api/login'
const Login = () => {
    // 登录表单数据
    var state = {
        username: "",
        password: ""
    };
    const dispatch = useDispatch();

    // 登录成功，跳转到home页面
    const navigate = useNavigate();
    
    // 点击表单 确认 按钮 value表单数据
    const onFinish = (values) => {
        // 更新loginInfo数据
        state = {
            username: values.username,
            password: values.password
        };       
        //   表单验证
        let checkRes = check.checkLoginInfo(state);
        let list = {msg: checkRes, type: 'warning'}
        dispatch(myAlertSet(list));
        if (checkRes === 'success') {
            if (values.remember === true) {
                util.setStorage('userInfo', state);
            }
            loginReq();
        } else {
            dispatch(myAlertShow());
        }
        
    };
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    // 登录接口
    const loginReq = async() => {
        // console.log('confirm:', state);
        const result = await $axios.postRequest(Url, state);
        // console.log('loginRes', result);
        if (result.message.status === 0) {
            util.setStorage('token', result.message.token);
            navigate('/admin/home');
        } else {
            let list = {msg: result.message, type: 'error'}
            dispatch(myAlertSet(list));
            dispatch(myAlertShow());
        }
        
    }
    
    const formEl = useRef();
    var isSet = true;
    const onValuesChange = (values) => {
        if (util.getStorage('userInfo') && isSet) {
            let userInfo = util.getStorage('userInfo');
            formEl.current.setFieldsValue({username: userInfo.username, password: userInfo.password}); // success
            isSet = false;
        }
    };
    
    return (
        <div className={style.bg}>
            <div className={style.loginBox}>
                <span className={style.name}>我讲给你听</span>
                <Form
                    name="basic"
                    ref={formEl}
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
                    onValuesChange ={onValuesChange}
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
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                    >
                    <Checkbox>Remember me</Checkbox>
                    </Form.Item>
            
                    <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                    >
                    <Button type="primary" htmlType="submit">
                        登录
                    </Button>
                    <Link to='/register' style={{marginLeft: "20px", borderBottom: "1px solid"}}>注册</Link>
                    </Form.Item>
                </Form>
            </div>
        </div>
      
    );
  };

export default Login;