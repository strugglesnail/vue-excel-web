import { get, post } from '@/utils/config.js'

export function getTableList(params) {
  return get('api/excel/getTableList', params)
}
export function getFields(params) {
  return get('api/excel/getFields', params)
}
export function deleteTableField(params) {
  return get('api/excel/deleteTableField', params)
}
export function addFields(params) {
  return post('api/excel/addFields', params)
}
export function addExcelData(params) {
  return post('api/excel/addExcelData', params)
}
