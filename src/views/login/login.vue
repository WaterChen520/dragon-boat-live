<template>
  <div class="login">
    <div class="header">
      <login-header></login-header>
    </div>

    <div class="panel">
      <login-panel />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginPanel from './components/login-panel.vue'
import LoginHeader from './components/login-heard.vue'

export default defineComponent({
  components: {
    LoginPanel,
    LoginHeader
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.login {
  background: url('http://211.149.191.209:8084/image/Mask%20Group%202.jpg');
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  width: 100%;
  height: 100%;
  .panel {
    position: absolute;
    right: 14%;
    top: 28%;
  }
}
</style>
