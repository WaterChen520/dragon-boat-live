<!--
 * @Description: echart组件
 * @Author: 安知鱼
 * @Email: 2268025923@qq.com
 * @Date: 2021-09-14 17:26:11
 * @LastEditTime: 2021-09-19 18:30:06
 * @LastEditors: 安知鱼
-->
<template>
  <div class="base-echart">
    <div
      ref="echartDivRef"
      :style="{ width: echartWidth, height: echartHeight }"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  onMounted,
  defineProps,
  withDefaults,
  watchEffect,
  watch,
  computed,
  onBeforeUnmount
} from 'vue'
import { EChartsOption } from 'echarts'
import useEchart from '../hooks/useEcharts'
import { useStore } from '@/store'

// 定义props,使用泛型定义Props的类型
const props = withDefaults(
  defineProps<{
    options: EChartsOption
    echartWidth?: string
    echartHeight?: string
  }>(),
  {
    echartWidth: '100%',
    echartHeight: '360px'
  }
)
const store = useStore()

const echartDivRef = ref<HTMLElement>()
const isFold: any = computed(() => store.state.isFold)

let timer: any
onMounted(() => {
  const { setOptions, updateSize } = useEchart(echartDivRef.value!)
  watchEffect(() => {
    setOptions(props.options)
  })
  watch(isFold, () => {
    let t = 10
    function reEchartSize() {
      if (t <= 0) {
        clearTimeout(timer)
        return
      }
      t--
      updateSize()
      timer = setTimeout(() => {
        return reEchartSize()
      }, 100)
    }
    reEchartSize()
  })
})
onBeforeUnmount(() => {
  clearTimeout(timer)
  timer = null
})
</script>

<style scoped></style>
