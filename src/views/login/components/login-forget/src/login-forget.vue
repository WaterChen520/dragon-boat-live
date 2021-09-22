<!--
 * @Description: 忘记密码组件
 * @Author: 安知鱼
 * @Email: 2268025923@qq.com
 * @Date: 2021-09-20 17:27:59
 * @LastEditTime: 2021-09-22 10:53:38
 * @LastEditors: 安知鱼
-->
<template>
  <div class="login-forget">
    <el-card class="container-card">
      <div class="header">
        <div class="left">
          <i class="el-icon-back back" @click="back"></i>
          <span>重置密码</span>
        </div>
        <div class="right">
          <span>已有账号，</span>
          <el-link type="primary" href="/" class="login-immediately"
            >立即登录</el-link
          >
        </div>
      </div>
      <div class="main">
        <an-form v-bind="forgetConfig" v-model="formData" ref="anFormRef">
          <template #append>
            <el-button
              class="get-code-btn"
              @click="getCode"
              :disabled="!getCodeDisabled"
              >{{ getCodeBtnText }}</el-button
            >
          </template>
          <template #footer>
            <span class="forget-footer">
              <el-button type="primary" class="sure" @click="resetPassword">
                确认重置
              </el-button>
            </span>
          </template>
        </an-form>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

import AnForm from '@/base-ui/form'

import { useCaptcha } from '../../../hooks/use-captcha'
import { forgetConfig } from '../config/forget-config'

export default defineComponent({
  components: {
    AnForm
  },
  emits: ['resetPassword'],
  setup(props, { emit }) {
    const store = useStore()
    type CallbackFn = (error?: any) => void

    const formItems = forgetConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = '18577777777'
    }
    const formData = ref(formOriginData)

    // 处理二次输入密码验证规则
    const verifyPasswordValidator = (
      rule: any[],
      value: any,
      callback: CallbackFn
    ) => {
      if (value === '') {
        callback(new Error('请再次输入您的密码'))
      } else if (value !== formData.value['newPassword']) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    const verifyPasswordRule = {
      validator: verifyPasswordValidator,
      trigger: 'blur'
    }
    const verifyPasswordItem = forgetConfig.formItems.find(
      (item) => item.field === 'verifyPassword'
    )
    verifyPasswordItem?.rules?.push(verifyPasswordRule)

    // 处理验证码
    const anFormRef = ref<InstanceType<typeof AnForm>>()
    const { getCodeDisabled, getCodeBtnText, changeBtn } = useCaptcha()

    const getCode = () => {
      anFormRef.value?.formRef?.validateField('phoneNum', (errorMessage) => {
        if (!errorMessage) {
          changeBtn()
          store.dispatch('login/getPhoneCode', formData.value['phoneNum'])
        }
      })
    }

    // 确认重置
    const resetPassword = () => {
      anFormRef.value?.formRef?.validate((valid) => {
        if (valid) {
          store.dispatch('login/resetPassword', { ...formData.value })
        }
      })
    }

    const back = () => {
      emit('resetPassword')
    }

    return {
      back,
      resetPassword,
      anFormRef,
      getCode,
      changeBtn,
      getCodeBtnText,
      getCodeDisabled,
      forgetConfig,
      formData
    }
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
    .header {
      display: flex;
      justify-content: space-between;
      .left {
        display: flex;
        width: 120px;
        justify-content: space-between;
        align-items: center;
        .back {
          font-size: x-large;
          cursor: pointer;
        }
      }
      .right {
        display: flex;
        width: 145px;
        align-items: center;
        font-size: 14px;
        .login-immediately {
          color: #ce2513;
        }
      }
    }
    .main {
      margin: 40px auto;
      width: 400px;
      .forget-footer {
        display: flex;
        justify-content: center;
      }
      .sure {
        width: 60%;
      }
    }
  }
}
.get-code-btn {
  padding: 8px;
}

.el-button.is-disabled,
.el-button.is-disabled:focus,
.el-button.is-disabled:hover {
  cursor: not-allowed;
  color: unset;
  background-image: unset;
  background-color: unset;
  border-color: transparent;
}
:deep(.el-input-group__append, .el-input-group__prepend) {
  background-color: #fff;
  color: #ce2513;
}
</style>
