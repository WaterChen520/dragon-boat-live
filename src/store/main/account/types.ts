/*
 * @Description: 我的账户vuex类型
 * @Author: 安知鱼
 * @Email: 2268025923@qq.com
 * @Date: 2021-09-23 12:38:25
 * @LastEditTime: 2021-09-23 17:26:48
 * @LastEditors: 安知鱼
 */
export interface IAccountState {
  userInfo: any
}

export interface IPasswordForm {
  oldPassword: string
  newPassword: string
  verifyPassword: string
}
