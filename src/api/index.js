/**
 * 接口汇总
 */
import axios from '@/config/http'
import { _getRightsList, _getMenuList } from './rights'
import { _getUsersList, _addUser, _updateUserState, _getUserInfo, _updateUserInfo, _delUser, _assignUserRoles } from './user'


const api = {
  // 登录验证接口
  login (data) {
    return axios.post('login', data)
  },
  // 权限管理
  _getRightsList,
  _getMenuList,
  // 用户管理
  _getUsersList,
  _addUser,
  _updateUserState,
  _getUserInfo,
  _updateUserInfo,
  _delUser,
  _assignUserRoles
}

export default api