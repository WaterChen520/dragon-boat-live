import { ref, watch } from 'vue'

export function useChangeTitle(title = '直播系统') {
  const titleRef = ref(title)

  watch(
    titleRef,
    (newValue) => {
      document.title = newValue
    },
    {
      immediate: true
    }
  )

  return titleRef
}
