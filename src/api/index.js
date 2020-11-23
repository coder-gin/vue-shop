
import axios from '@/config/http'


const api = {
  // 登录验证接口
  login (data) {
    return axios.post('login', data)
  }
}

export default api