import Login from '../views/login/Login'
import Register from '../views/login/Register'
import Admin from '../views/admin'
// 介绍我们
import Home from '../views/sandbox/home/Home'
// 景点管理
import ViewManage from '../views/sandbox/city-view-manage/ViewManage'
import ViewDeleteHistroy from '../views/sandbox/city-view-manage/ViewDeleteHistroy'
// 讲解器管理
import ManageInterpreter from '../views/sandbox/interpreter-manage/ManageInterpreter'
import RecordInterpreter from '../views/sandbox/interpreter-manage/RecordInterpreter'
import ViewInterpreter from '../views/sandbox/interpreter-manage/ViewInterpreter'
// 权限管理
import RoleRight from '../views/sandbox/right-manage/RoleRight'
// 用户管理
import UserInfo from '../views/sandbox/user-manage/UserInfo'
// 图表展示
import InterpreterShow from '../views/sandbox/charts-show/InterpreterShow'
import ViewShow from '../views/sandbox/charts-show/ViewShow'

import Error404 from '../views/Error404/Error404'
import { Navigate } from 'react-router-dom'
const IndexRouter = [
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/admin",
        element: <Admin />, 
        children: [
            {
                path: "/admin/home",
                element: <Home />
            },
            {
                path: "/admin/city_view_manage/viewManage",
                element: <ViewManage />,
            },
            {
                path: "/admin/city_view_manage/viewDeleteHistroy",
                element: <ViewDeleteHistroy />,
            },
            {
                path: "/admin/interpreter_manage/recordInterpreter",
                element: <RecordInterpreter />,
            },
            {
                path: "/admin/interpreter_manage/manageInterpreter",
                element: <ManageInterpreter />,
            },
            {
                path: "/admin/interpreter_manage/viewInterpreter",
                element: <ViewInterpreter />,
            },
            {
                path: "/admin/user_manage/userInfo",
                element: <UserInfo />,
            },
            {
                path: "/admin/right_manage/roleRight",
                element: <RoleRight />,
            },
            {
                path: "/admin/charts_show/interpreterShow",
                element: <InterpreterShow />,
            },
            {
                path: "/admin/charts_show/viewShow",
                element: <ViewShow />,
            },
        ]
    },
    {
        path: "/",
        exact: true,
        element: <Navigate to="/login"/>,
        
    },
    {
       path: "*",
       element: <Error404 />,
    },
]



export default IndexRouter;