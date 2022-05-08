import React from 'react';
import { Col, Row } from 'antd';
import { Outlet } from 'react-router-dom';
import 'antd/dist/antd.min.css';
import style from'./index.less'
import NavLeft from '../../components/NavLeft'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import MyAlert from '../../components/MyAlert'
import util from '../../js/util'

class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: ""
        };
    }
    // 验证是否登录了
    componentDidMount(){
        const userInfo = util.getStorage("userInfo");
        this.setState({username: userInfo.username});
    }
    render() {
        return (
            <>
            <div>
            <MyAlert></MyAlert>
                <Row className={style.container} wrap={false}>
                    
                    <Col span={3} className={style.navLeft}>
                            <NavLeft></NavLeft>
                    </Col>
                    <Col span={21} className={style.main}>
                        <Row>
                            <Header>{this.state.username}</Header>
                        </Row>
                        <Row className={style.content}>
                            <Outlet />
                        </Row>
                        <Row>
                            <Footer></Footer>
                        </Row>
                    </Col>
                </Row>
                
            </div>
            </>
        );
    }
}

export default index;
