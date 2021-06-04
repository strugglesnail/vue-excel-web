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
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="deleteTableField(scope.row)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { getFields, deleteTableField } from '@/api/excel'
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
    },
    deleteTableField(row) {
      console.log(row)
      this.$confirm('确认删除?', '提示', {
        cancelButtonClass: 'btn-custom-cancel',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteTableField({ tableFieldId: row.tableFieldId }).then(res => {
          if (res.success) {
            this.$message.success('删除成功')
            // 刷新列表
            this.getTableList()
          }
        })
      }).catch(() => {})
    }
  }
}
</script>

<style scoped>

</style>
