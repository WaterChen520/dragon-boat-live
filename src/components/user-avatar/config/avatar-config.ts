/*
 * @Description: 头像上传配置文件
 * @Author: 安知鱼
 * @Email: 2268025923@qq.com
 * @Date: 2021-09-23 09:54:44
 * @LastEditTime: 2021-09-23 11:38:50
 * @LastEditors: 安知鱼
 */
import Cache from '@/utils/cache'
// 上传路径
export const actionUrl =
  'http://211.149.191.209:8084/dataWarehousePortal/voluntarily/measuredData/measuredDataImport'
// 默认头像
export const defaultAvatarImg =
  'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
// 上传额外参数
export const extraParams = {
  userId: Cache.getCache('userInfo').userId,
  tripartiteAccountNumberId: 1,
  commodityId: 1
}
// 请求头
export const headers = { Token: window.sessionStorage.getItem('token') }
