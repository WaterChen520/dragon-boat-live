/*
 * @Description: 使用本地缓存
 * @Author: 安知鱼
 * @Email: 2268025923@qq.com
 * @Date: 2021-09-27 17:46:39
 * @LastEditTime: 2021-09-27 17:53:52
 * @LastEditors: 安知鱼
 */

import { ref, watch } from 'vue'
import cache from '@/utils/cache'

export default function (key: string, value?: any) {
  const data = ref(value)

  if (value) {
    cache.setCache(key, value)
  } else {
    data.value = cache.getCache(key)
  }

  watch(data, (newValue) => {
    cache.setCache(key, newValue)
  })

  return data
}
