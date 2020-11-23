/**
 * 商品分类管理接口
 */
import axios from '@/config/http'

//  商品分类数据列表
export function getCategoriesList () {
  return axios.get('categories')
}
// 添加分类
export function addCategory () {
  return axios.post('categories', data)
}

// 根据 id 查询分类
export function getCategory (id) {
  return axios.get(`categories/${id}`)
}

// 编辑提交分类
export function updateCategory (id) {
  return axios.put(`categories/${id}`)
}

// 删除分类
export function delCategory (id) {
  return axios.delete(`categories/${id}`)
}