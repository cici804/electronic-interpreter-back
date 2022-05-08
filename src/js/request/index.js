import axios from "axios";
import qs from "qs";
import util from "../util";

const baseURL = "http://127.0.0.1:3007"; // 设置全局默认基本信息
axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded"; // 设置默认的请求头的Content-Type

// 请求拦截器
axios.interceptors.request.use((config) => {
  // 筛选 上传文件
  if (Object.prototype.toString.call(config.data) !== "[object FormData]") {
    config.data = qs.stringify(config.data);
  }
  // 判断token存在再做配置
  if (util.getStorage("token")) {
    let token = util.getStorage("token");
    config.headers.Authorization = token;
  }
  return config;
});

// 响应拦截器
axios.interceptors.response.use((response) => response.data);

/**
 * @getRequest 封装的get请求的方法
 * @param {*} url 请求的地址
 * @param {*} data  请求的数据
 * @returns 数据请求的promise对象
 */
function getRequest(url, data) {
  return axios.get(baseURL + url, {
    params: data,
  });
}

/**
 * @postRequest 封装post请求的方法
 * @param {*} url 请求的地址
 * @param {*} data 请求的数据
 * @returns 数据请求的promise对象
 */
function postRequest(url, data) {
  return axios.post(baseURL + url, data);
}

/**
 * @delRequest 封装delete请求的方法
 * @param {*} url 请求的地址
 * @returns 数据请求的promise对象
 */
function delRequest(url) {
    return axios.delete(baseURL + url);
  }

export default {
  postRequest,
  getRequest,
  delRequest
};
