// 管理用户权限 管理员才能进入
import React from 'react';
import style from '../../../less/contentBox.less';
import {Row} from 'antd';

const RoleRight = () => {
    return(
        <Row className={style.contentBox}>
           管理用户权限
        </Row>
    )
}

export default RoleRight;