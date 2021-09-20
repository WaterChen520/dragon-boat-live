<!--
 * @Description: 忘记密码组件
 * @Author: 安知鱼
 * @Email: 2268025923@qq.com
 * @Date: 2021-09-20 17:27:59
 * @LastEditTime: 2021-09-20 18:00:15
 * @LastEditors: 安知鱼
-->
<template>
  <div class="login-forget">
    <el-card class="container-card"> </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.login-forget {
  width: 75%;
  margin: 20px auto;
  display: flex;
  .container-card {
    width: 100%;
    height: 500px;
  }
}
</style>
