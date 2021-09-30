/*
 * @Description: 我的账户
 * @Author: 安知鱼
 * @Email: 2268025923@qq.com
 * @Date: 2021-09-23 12:37:42
 * @LastEditTime: 2021-09-27 21:24:39
 * @LastEditors: 安知鱼
 */
import { Module } from 'vuex'
import { IRootStore } from './../../type'
import { IAccountState, IPasswordForm } from './types'
import {
  changeAvatar,
  changeUserName,
  changePassword
} from '@/service/main/account/account'

import useLocalStorage from '@/hooks/use-local-storage'
import { ElMessage } from 'element-plus'

const accountModule: Module<IAccountState, IRootStore> = {
  namespaced: true,
  state() {
    return {
      userInfo: {}
    }
  },
  mutations: {
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    }
  },
  actions: {
    async changeAvatarAction({ commit }, payload: any) {
      const changeAvatarResult = await changeAvatar(
        payload.url,
        payload.formData
      )
      console.log(changeAvatarResult)
      if (changeAvatarResult.code === 200) {
        const userInfo = useLocalStorage('userInfo')
        userInfo.value = changeAvatarResult.data
        console.log(userInfo.value)

        commit('changeUserInfo', userInfo)

        ElMessage.success('修改头像成功！')
      } else {
        ElMessage.error('修改头像失败！')
      }
    },
    async changeUserName({ commit }, payload: string) {
      const changeUserNameResult = await changeUserName(payload)
      console.log(changeUserNameResult)
      if (changeUserNameResult.code === 200) {
        const userInfo = useLocalStorage('userInfo')
        userInfo.value = changeUserNameResult.data
        console.log(userInfo.value)

        commit('changeUserInfo', userInfo)

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
