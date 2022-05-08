// 介绍我们
import React from "react";
import { Row } from "antd";
import style from "../../../less/contentBox.less";
import Istyle from "./index.less"

const Home = () => {
  return (
    <Row className={style.contentBox}>
      <div className={Istyle.content}>
        <h2>我讲给你听</h2>
        <p>大家到景点参观的时候有试过租借讲解器吗？通过讲解器，大家到景点对应的地方便能听到相关的介绍。但是景点得讲解器循环利用，功能简单，价格也稍微昂贵
        “我讲给你听”APP由此诞生，主要功能为购买讲解、录制讲解，用户既可通过讲解币购买讲解，也可通过录制讲解获得讲解币。</p>
      </div>
    </Row>
  );
};

export default Home;
