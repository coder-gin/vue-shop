/**
 * 角色管理接口
 */
import axios from '@/config/http'

// 角色列表
export function getRolesList () {
  return axios.get('roles')
}

// 添加角色
export function addRole (data) {
  return axios.post('roles', data)
}

// 根据 ID 查询角色
export function getRoleInfo (id) {
  return axios.get(`roles/${id}`)
}

// 编辑提交角色
export function updateRoleInfo (id) {
  return axios.put(`roles/${id}`)
}

// 删除角色
export function delRole (id) {
  return axios.delete(`roles/${id}`)
}

// 角色授权
export function RoleRights (roleId) {
  return axios.post(`roles/${roleId}/rights`)
}

// 删除角色指定权限
export function delRole (roleId, rightId) {
  return axios.delete(`roles/${roleId}/rights/${rightId}`)
}