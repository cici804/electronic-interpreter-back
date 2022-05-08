import React from 'react';
import {Col,Row} from 'antd';
import style from './index.less'
import {Link} from 'react-router-dom'
class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
         };
    }
    render() {
        return (
            <div className={style.header}>
                
                <Row>
                    <Col span="24" className={style.box}>
                        <span className={style.content}>欢迎，{this.props.children}</span>
                        <Link to='/login'>退出</Link>
                    </Col>
                </Row>
            </div>
        );
    }
    // logout() {
    //     Navigate(to="/login") ;

    // }
}

export default index;