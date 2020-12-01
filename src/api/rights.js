/**
 * 权限管理接口
 */
import axios from '@/config/http'

// 所有权限列表
export function _getRightsList (type) {
  return axios.get(`rights/${type}`)
}

// 左侧菜单权限
export function _getMenuList () {
  return axios.get('menus')
}