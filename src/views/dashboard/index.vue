<template>
  <div class="dashboard-container">
    <!--<div class="dashboard-text">name: {{ name }}</div>-->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>表名</span>
        <el-button style="float: right; padding: 3px 0" type="text">请选择表</el-button>
      </div>
      <custom-tree :tree-data="treeData" />
    </el-card>
  </div>
</template>

<script>
import { getTableList } from '../../api/excel'
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
      treeData: []
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
