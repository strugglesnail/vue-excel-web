import { get, post } from '@/utils/config.js'

export function getTableList(params) {
  return get('api/excel/getTableList', params)
}
