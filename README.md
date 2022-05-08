### 项目运行，http://localhost:3003/ `npm start`

### 执行脚本 `npm test`

### 打包项目 `npm run build`

### 暴露node_modules `npm run eject`

### 项目目录架构
├── config   // 配置相关   
├── script   // 构建脚本 
├── public   // 应用对外目录 
├── src      // 源代码 
│   ├── components  // 公共组件
│   ├── font        // 字体相关
│   ├── js          // js库
│   ├── router      // 路由相关
        ├── IndexRouter //管理路由
│   ├── less        // 公共样式表
│   ├── store       // redux相关
│   ├── views       // 页面应用
        ├── login //登录路由
        ├── admin //主页面
        ├── Error404 //Error404
        ├── sandbox //子路由，左侧菜单对应展示页面
            ├── home //介绍我们
            ├── city-view-manager //管理城市-景点数据
            ├── interpreter-manager //管理讲解器数据
            ├── right-manage //管理权限角色
            ├── user-manager //管理用户、用户信息
            ├── charts-show //数据展示
│   ├── index.js    // 入口文件
│   ├── Page.js     // 页面路由入口
│   ├── App.js      // 主应用入口

