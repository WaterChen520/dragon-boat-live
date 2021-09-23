<template>
  <div class="user-info">
    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <el-avatar
          size="small"
          style="margin-right: 10px"
          :src="avatarUrl ? avatarUrl : defaultAvatar"
        ></el-avatar>
        <span>{{ name }}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleChangePasswordClick"
            >修改密码</el-dropdown-item
          >
          <el-dropdown-item @click="handleExitClick">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import cache from '@/utils/cache'
import { useRouter } from 'vue-router'

import { defaultAvatar } from '../config/header.config'

export default defineComponent({
  setup() {
    const router = useRouter()
    const name = computed(() => cache.getCache('userInfo').name)
    const avatarUrl = computed(() => cache.getCache('userInfo').avatarUrl)

    const handleExitClick = () => {
      cache.clearCache()
      router.push('/login')
    }
    const handleChangePasswordClick = () => {
      router.push('/main/password')
    }

    return {
      defaultAvatar,
      avatarUrl,
      name,
      handleChangePasswordClick,
      handleExitClick
    }
  }
})
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
