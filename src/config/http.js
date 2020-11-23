/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios'
import { Message } from 'element-ui'
import baseURL from './baseURL'

// 创建axios实例
const instance = axios.create({
  timeout: 5000,
  baseURL
})

// 请求拦截器
instance.interceptors.request.use(config => {
  // 添加token验证
  const token = localStorage.getItem('token')
  token && (config.headers.Authorization = token)
  return config
}, err => Promise.reject(err))

// 响应拦截器
instance.interceptors.response.use(response => {
  return response.data
}, err => {
  const { response } = err
  if (response) {
    // 请求已经发送，只不过状态码不是200系列，设置不同状态码的不同处理
    switch (err.response.status) {
      case 400:
        Message.error('请求的地址不存在或者包含不支持的参数')
        break
      case 401:
        Message.error('未授权')
        break
      case 403: // 服务器已经理解请求，但是拒绝执行它（一般是token过期）
        localStorage.removeItem('token')
        break
      case 404: // 请求失败，请求所希望得到的资源未被在服务器上发现
        Message.error('请求的资源不存在')
        break
    }
  } else {
    // 处理断网的情况
    // eg:请求超时或断网时，更新state的network状态
    // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
    // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
    if (!window.navigator.onLine) {
      return
    } else {
      return Promise.reject(err)
    }
  }
}
)

export default instance