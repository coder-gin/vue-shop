/**
 * 接口域名的管理
 */
let baseURL
switch (process.env.NODE_ENV) {
  case 'dev':
    baseURL = 'http://127.0.0.1:8888/api/private/v1/'
    break
  default:
    baseURL = 'http://127.0.0.1:8888/api/private/v1/'
}

export default baseURL