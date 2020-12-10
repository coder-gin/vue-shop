/**
 * 接口汇总
 */
import axios from '@/config/http'
import { _getRightsList, _getMenuList } from './rights'
import { _getUsersList, _addUser, _updateUserState, _getUserInfo, _updateUserInfo, _delUser, _assignUserRoles } from './user'
import { _getRolesList, _addRole, _getRoleInfo, _updateRoleInfo, _delRole, _RoleRights, _delRoleRights } from './roles'


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
  _assignUserRoles,
  // 角色管理
  _getRolesList,
  _addRole,
  _getRoleInfo,
  _updateRoleInfo,
  _delRole,
  _RoleRights,
  _delRoleRights
}

export default api