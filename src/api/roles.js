/**
 * 角色管理接口
 */
import axios from '@/config/http'

// 角色列表
export function _getRolesList () {
  return axios.get('roles')
}

// 添加角色
export function _addRole (data) {
  return axios.post('roles', data)
}

// 根据 ID 查询角色
export function _getRoleInfo (id) {
  return axios.get(`roles/${id}`)
}

// 编辑提交角色
export function _updateRoleInfo (id, data) {
  return axios.put(`roles/${id}`, data)
}

// 删除角色
export function _delRole (id) {
  return axios.delete(`roles/${id}`)
}

// 角色授权
export function _RoleRights (roleId, data) {
  return axios.post(`roles/${roleId}/rights`, {
    rids: data
  })
}

// 删除角色指定权限
export function _delRoleRights (roleId, rightId) {
  return axios.delete(`roles/${roleId}/rights/${rightId}`)
}