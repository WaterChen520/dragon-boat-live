/*
 * @Description: 账号登录配置文件
 * @Author: 安知鱼
 * @Email: 2268025923@qq.com
 * @Date: 2021-09-18 16:49:27
 * @LastEditTime: 2021-09-20 12:45:04
 * @LastEditors: 安知鱼
 */

import { IForm } from '@/base-ui/form'

export const accountConfig: IForm = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '账号',
      placeholder: '请输入账号',
      rules: [
        {
          required: true,
          message: '用户名是必传内容~',
          trigger: 'blur'
        },
        {
          pattern: /^[a-z0-9]{5,10}$/,
          message: '用户名必须是5~10个字母或者数字~',
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'password',
      type: 'password',
      label: '密码',
      placeholder: '请输入密码',
      rules: [
        {
          required: true,
          message: '密码是必传内容~',
          trigger: 'blur'
        },
        {
          pattern: /^[a-z0-9]{3,}$/,
          message: '用户名必须是3位以上的字母或者数字~',
          trigger: 'blur'
        }
      ],
      itemStyle: { margin: '0px 0px 0px 0px' }
    }
  ],
  labelWidth: '60px',
  itemStyle: { padding: '0px 0px' },
  colLayout: { span: 24 }
}
