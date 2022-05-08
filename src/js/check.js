// 表单验证
export default {
    // 登录表单验证
    checkLoginInfo(data){
        //用户名正则，4到16位（字母，数字，下划线，减号）
        var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
        if (!uPattern.test(data.username)) {
            return "用户名不合法，长度为4到16位（字母，数字，下划线，减号）"
        }
        //密码强度正则，6到10位，字母，数字
        var pPattern = /^[0-9A-Za-z]{6,10}$/;
        if (!pPattern.test(data.password)) {
            return "密码不合法，长度为6到10位"
        }
        return "success"
    },
}
