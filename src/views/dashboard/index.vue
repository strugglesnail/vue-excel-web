<template>
  <div class="dashboard-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>表名</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="chooseTable">请选择表</el-button>
      </div>
      <custom-tree :get-tree-data="getTreeData" />
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>字段排序</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="chooseTable">表字段列表</el-button>
        <table-card ref="table" :get-table-data="getTableData" />
      </div>
    </el-card>
  </div>
</template>

<script>
import { addFields } from '@/api/excel'
import CustomTree from './components/TreeCard'
import TableCard from './components/TableCard'

export default {
  name: 'Dashboard',
  components: { TableCard, CustomTree },
  data() {
    return {
      checkedTreeData: {},
      tableData: [],
      hasShowTableCard: false
    }
  },
  computed: {
  },

  methods: {
    chooseTable() {
      // console.log(typeof this.checkedTreeData, Object.keys(this.checkedTreeData).length)
      if (!this.checkedTreeData || this.checkedTreeData.length === 0) {
        this.$message.warning('请选择复选框')
        return
      }
      // 选择的复选框数据
      const params = []
      this.checkedTreeData.forEach(tree => {
        const param = { tableName: tree.label, fields: [] }
        tree.children.forEach((field, i) => {
          param.fields.push({
            index: i + 1,
            name: field.label,
            type: field.type
          })
        })
        params.push(param)
      })
      // 同步
      addFields(params).then(res => {
        if (res.success) {
          this.hasShowTableCard = true
          this.$message.success('保存成功')
          // 刷新表格
          this.$refs.table.getTableList()
        }
      })
    },
    // 获取选中的树
    getTreeData(treeData) {
      this.checkedTreeData = treeData.filter(td => td.hasOwnProperty('children'))
    },
    getTableData(tableData) {
      this.tableData = tableData
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
  /*height: 600px;*/
  display: inline-block;
  margin-left: 150px;
}
</style>
