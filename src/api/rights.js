/**
 * 权限管理接口
 */
import axios from '@/config/http'

export function getRightsList (type) {
  return axios.get(`rights/${type}`)
}

export function getMenuList () {
  return axios.get('menus')
}