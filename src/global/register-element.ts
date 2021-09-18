/*
 * @Description:ElmentUi注册
 * @Author: 安知鱼
 * @Email: 2268025923@qq.com
 * @Date: 2021-08-28 13:10:15
 * @LastEditTime: 2021-09-18 17:37:10
 * @LastEditors: 安知鱼
 */

import { App } from 'vue'

import ElementPlus from 'element-plus'
import '@/assets/css/element-plus-#CE2513/index.css'

export default (app: App): void => {
  app.use(ElementPlus)
}
