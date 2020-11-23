/**
 * 用户管理接口
 */
import axios from '@/config/http'

// 用户数据列表
export function getUsersList (data) {
  return axios.get('users', data)
}

// 添加用户
export function addUser (data) {
  return axios.post('users', data)
}

// 修改用户状态
export function updateUserState (id, type) {
  return axios.put(`users/${id}/state/${type}`)
}

// 根据 ID 查询用户信息
export function getUserInfo (id) {
  return axios.get(`users/${id}`)
}

// 编辑用户提交
export function updateUserInfo (id) {
  return axios.put(`users/:${id}`)
}

// 删除单个用户
export function delUser (id) {
  return axios.delete(`users/${id}`)
}

// 分配用户角色
export function assignUserRoles (id) {
  return axios.put(`users/${id}/role`)
}

