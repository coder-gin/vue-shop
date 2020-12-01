/**
 * 用户管理接口
 */
import axios from '@/config/http'

// 用户数据列表
export function _getUsersList (data) {
  return axios.get('users', {
    params: data
  })
}

// 添加用户
export function _addUser (data) {
  return axios.post('users', data)
}

// 修改用户状态
export function _updateUserState (id, type) {
  return axios.put(`users/${id}/state/${type}`)
}

// 根据 ID 查询用户信息
export function _getUserInfo (id) {
  return axios.get(`users/${id}`)
}

// 编辑用户提交
export function _updateUserInfo (id, data) {
  return axios.put(`users/${id}`, data)
}

// 删除单个用户
export function _delUser (id) {
  return axios.delete(`users/${id}`)
}

// 分配用户角色
export function _assignUserRoles (id) {
  return axios.put(`users/${id}/role`)
}

