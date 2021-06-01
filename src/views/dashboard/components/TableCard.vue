<template>
  <el-table
    :data="tableData"
    height="250"
    border
    style="width: 100%">
    <el-table-column
      prop="tableName"
      label="表名"
      width="100">
    </el-table-column>
    <el-table-column
      prop="fieldNames"
      label="对应Excel列顺序">
    </el-table-column>
  </el-table>
</template>

<script>
import { getFields } from '@/api/excel'
export default {
  name: 'TableCard',
  props: {
    refreshTable: {
      type: Boolean,
      default: false
    },
    getTableData: {
      type: Function
    }
  },
  mounted() {
    this.getTableList()
  },
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    getTableList() {
      getFields().then(res => {
        if (res.success) {
          this.tableData = res.data
          this.getTableData(res.data)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
