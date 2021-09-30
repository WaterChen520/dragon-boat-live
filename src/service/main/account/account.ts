/*
 * @Description: 我的账号请求
 * @Author: 安知鱼
 * @Email: 2268025923@qq.com
 * @Date: 2021-09-23 12:30:36
 * @LastEditTime: 2021-09-27 19:36:57
 * @LastEditors: 安知鱼
 */

import anRequest from '@/service/index'
import { IPasswordForm } from './type'
import { IDataType } from '../../types'

enum AccountAPI {
  changeUserName = '/changeUserName',
  changePassword = '/changePassword'
}

/**
 * @Description: 修改头像
 * @Author: 安知鱼
 * @param  {*}
 * @return {*}
 * @param {string} url
 * @param {any} queryInfo
 */
export function changeAvatar(url: string, formData: FormData) {
  return anRequest.post<IDataType>({
    url: url,
    data: formData,
    showLoading: true,
    timeout: 200000000
  })
}

/**
 * @Description: 修改用户名
 * @Author: 安知鱼
 * @param  {*}
 * @return {*}
 * @param {string} url
 * @param {any} queryInfo
 */
export function changeUserName(userName: string) {
  return anRequest.post<IDataType>({
    url: AccountAPI.changeUserName,
    data: userName
  })
}

/**
 * @Description: 修改用户名
 * @Author: 安知鱼
 * @param  {*}
 * @return {*}
 * @param {string} url
 * @param {any} queryInfo
 */
export function changePassword(passwordForm: IPasswordForm) {
  return anRequest.post<IDataType>({
    data: passwordForm
  })
}
