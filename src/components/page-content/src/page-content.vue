<!--
 * @Description: 封装page-content
 * @Author: 安知鱼
 * @Email: 2268025923@qq.com
 * @Date: 2021-09-10 15:08:23
 * @LastEditTime: 2021-09-30 16:08:47
 * @LastEditors: 安知鱼
-->
<template>
  <div class="page-content">
    <an-table
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
      @selectionChange="selectionChange"
    >
      <!-- 1.head中的插槽 -->
      <template #headerHandler v-if="contentTableConfig.headerHandler">
        <el-button
          type="primary"
          size="medium"
          v-if="isCreate && contentTableConfig.headerHandler.increase"
          @click="handleNewClick"
        >
          {{ contentTableConfig.headerHandler.increase }}
        </el-button>

        <el-button
          type="danger"
          size="medium"
          v-if="
            isDelete &&
            contentTableConfig.headerHandler.removeAll &&
            contentTableConfig.showSelectColumn
          "
          @click="handleDeleteClick()"
        >
          {{ contentTableConfig.headerHandler.removeAll }}
        </el-button>
      </template>

      <!-- 2.列中的插槽 -->
      <template #createAt="scope">
        <span>{{
          $filters.formatTimeUtc(scope.row.createAt, 'YYYY-MM-DD HH:mm:ss')
        }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTimeUtc(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            icon="el-icon-edit"
            size="mini"
            type="text"
            v-if="isUpdate"
            @click="handleEditClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            icon="el-icon-delete"
            size="mini"
            type="text"
            v-if="isDelete"
            @click="handleDeleteClick(scope.row.id)"
            >删除</el-button
          >
        </div>
      </template>
      <!-- 在page-content中动态插入剩余的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </an-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, reactive } from 'vue'
import { useStore } from '@/store'
import { usePermission } from '@/hooks'

import { ElMessage } from 'element-plus'
import { ElMessageBox } from 'element-plus'
import AnTable from '@/base-ui/table'

export default defineComponent({
  components: {
    AnTable
  },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore()
    // 获取操作的id集合
    let selectionsIds: any = reactive([])
    const selectionChange = (value: any) => {
      selectionsIds = []
      for (const key of value) {
        selectionsIds.push(key.id)
      }
    }

    // 1. 获取操作权限
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    // 2.双向绑定pageInfo
    const pageInfo = ref({ currentPage: 1, pageSize: 10 })
    watch(pageInfo, () => getPageData())

    // 3.发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('system/getPageListAction', {
        pageName: props.pageName,
        queryInfo: {
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()

    // 4.从vuex中获取数据
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )
    const dataCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )

    // 5.获取其他的动态插槽名称
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )

    // 6.删除/编辑/新建操作
    const handleDeleteClick = (itemId: number) => {
      if (!itemId && selectionsIds.length === 0) {
        ElMessage.error('请先选择需要删除的数据！')
        return
      }
      ElMessageBox.confirm('将删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let deleteIds = itemId ?? selectionsIds
          console.log(deleteIds)
          store.dispatch('system/deletePageDataAction', {
            pageName: props.pageName,
            id: deleteIds
          })
        })
        .catch((err) => {
          console.log(err)
          ElMessage({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
    const handleNewClick = () => emit('newBtnClick')
    const handleEditClick = (item: any) => emit('editBtnClick', item)

    return {
      selectionsIds,
      pageInfo,
      dataList,
      dataCount,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleDeleteClick,
      handleNewClick,
      handleEditClick,
      selectionChange,
      getPageData
    }
  }
})
</script>

<style scoped>
.page-content {
  padding-top: 20px;
}
</style>
