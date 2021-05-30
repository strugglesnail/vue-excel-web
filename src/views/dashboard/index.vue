<template>
  <div class="dashboard-container">
    <!--<div class="dashboard-text">name: {{ name }}</div>-->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>表名</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="chooseTable">请选择表</el-button>
      </div>
      <custom-tree :tree-data="treeData" :get-tree-data="getTreeData" />
    </el-card>
  </div>
</template>

<script>
import { getTableList, addFields } from '../../api/excel'
import CustomTree from './tree/index'
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  components: { CustomTree },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      treeData: [],
      checkedTreeData: {}
    }
  },
  mounted() {
    this.getTables()
  },
  methods: {
    getTables() {
      getTableList().then(res => {
        this.treeData = res
      })
    },
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

      })
    },
    getTreeData(treeData) {
      this.checkedTreeData = treeData
      console.log('re', this.checkedTreeData)
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
}
</style>
