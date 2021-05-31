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
  computed: {
  },
  data() {
    return {
      checkedTreeData: {},
      tableData: [],
      hasShowTableCard: false
    }
  },

  methods: {
    chooseTable() {
      console.log(typeof this.checkedTreeData, Object.keys(this.checkedTreeData).length)
      if (!this.checkedTreeData || !this.checkedTreeData.hasOwnProperty('children') || this.checkedTreeData.children.length === 0) {
        this.$message.warning('请选择复选框')
        return
      }
      console.log('T: ', this.checkedTreeData.children.map(t => t.label).join(','))
      const fields = []
      this.checkedTreeData.children.forEach((d, i) => {
        fields.push({
          index: i + 1,
          name: d.label,
          type: d.type
        })
      })
      // 同步
      const params = {
        name: this.checkedTreeData.label,
        fields: fields
      }
      addFields(params).then(res => {
        if (res.success) {
          this.hasShowTableCard = true
          // 刷新表格

        }
      })
    },
    getTreeData(treeData) {
      this.checkedTreeData = treeData
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
  display: inline-block;
  margin-left: 150px;
}
</style>
