<template>
  <div class="login">
    <div class="header">
      <login-header></login-header>
    </div>

    <div class="container" v-if="login">
      <login-container @ForgetClick="ForgetClick" />
    </div>

    <div class="forget-password" v-else>
      <login-forget @resetPassword="ForgetClick"></login-forget>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginContainer from './components/login-container.vue'
import LoginHeader from './components/login-heard.vue'
import LoginForget from './components/login-forget'

export default defineComponent({
  components: {
    LoginContainer,
    LoginHeader,
    LoginForget
  },
  setup() {
    const login = ref(true)

    const ForgetClick = () => {
      login.value = !login.value
    }

    return {
      ForgetClick,
      login
    }
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
  .container {
    position: absolute;
    right: 14%;
    top: 26%;
  }
}
</style>
