/*
 * @Description: 我的账户
 * @Author: 安知鱼
 * @Email: 2268025923@qq.com
 * @Date: 2021-09-23 12:37:42
 * @LastEditTime: 2021-09-23 17:29:25
 * @LastEditors: 安知鱼
 */
import { Module } from 'vuex'
import { IRootStore } from './../../type'
import { IAccountState, IPasswordForm } from './types'
import {
  getAvatarUrl,
  changeUserName,
  changePassword
} from '@/service/main/account/account'

import Cache from '@/utils/cache'
import { ElMessage } from 'element-plus'

const accountModule: Module<IAccountState, IRootStore> = {
  namespaced: true,
  state() {
    return {
      userInfo: {}
    }
  },
  mutations: {},
  actions: {
    async getAvatarUrlAction(context, payload: any) {
      const getAvatarUrlResult = await getAvatarUrl(
        payload.url,
        payload.formData
      )
      console.log(getAvatarUrlResult)
      if (getAvatarUrlResult.code === 200) {
        const { avatarUrl } = getAvatarUrlResult.data
        const userInfo = Cache.getCache('userInfo')
        userInfo.avatarUrl = avatarUrl
        userInfo.Cache.setCache('userInfo', userInfo)
        ElMessage.success('修改头像成功！')
      } else {
        ElMessage.error('修改头像失败！')
      }
    },
    async changeUserName(context, payload: string) {
      const changeUserNameResult = await changeUserName(payload)
      console.log(changeUserNameResult)
      if (changeUserNameResult.code === 200) {
        const { userName } = changeUserNameResult.data
        const userInfo = Cache.getCache('userInfo')
        userInfo.userName = userName
        userInfo.Cache.setCache('userInfo', userInfo)
        ElMessage.success('修改用户名成功！')
      } else {
        ElMessage.error('修改用户名失败！')
      }
    },
    async changePassword(context, payload: IPasswordForm) {
      const changePasswordResult = await changePassword(payload)
      console.log(changePasswordResult)
      if (changePasswordResult.code === 200) {
        ElMessage.success('修改密码成功！')
      } else {
        ElMessage.error('修改密码失败！')
      }
    }
  }
}

export default accountModule
