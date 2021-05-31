<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />

    <el-tree
      ref="tree"
      :data="treeData"
      node-key="id"
      default-expand-all
      draggable
      show-checkbox
      :render-content="renderContent"
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
      @check="currentChange	"
      @node-drag-start="handleDragStart"
      @node-drag-enter="handleDragEnter"
      @node-drag-leave="handleDragLeave"
      @node-drag-over="handleDragOver"
      @node-drag-end="handleDragEnd"
      @node-drop="handleDrop"
    />

  </div>
</template>

<script>
import { getTableList } from '@/api/excel'
export default {
  props: {
    getTreeData: {
      type: Function
    }
  },
  data() {
    return {
      treeData: [],
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    this.getTables()
  },
  methods: {
    getTables() {
      getTableList().then(res => {
        this.treeData = res.data
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleDragStart(node, ev) {
      // console.log('drag start', node)
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      // console.log('components drag enter: ', dropNode.label)
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      // console.log('components drag leave: ', dropNode.label)
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log('components drag over: ', dropNode.label)
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      // console.log('components drag end: ', dropNode && dropNode.label, dropType)
      // console.log(this.treeData)
      this.getTreeData(this.getCheckedNodes())
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      // console.log('components drop: ', dropNode.label, dropType)
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label === '二级 3-1') {
        return type !== 'inner'
      } else {
        return true
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf('三级 3-2-2') === -1
    },

    // append(data) {
    //   const newChild = { id: id++, label: 'testtest', children: [] }
    //   if (!data.children) {
    //     this.$set(data, 'children', [])
    //   }
    //   data.children.push(newChild)
    // },

    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
      this.getTreeData(this.getCheckedNodes())
    },

    renderContent(h, { node, data, store }) {
      return (
        <span class='custom-tree-node'>
          <span>{node.label}</span>
          <span>
            <el-button size='mini' type='text' on-click={ () => this.remove(node, data) }>删除</el-button>
          </span>
        </span>)
    },
    getCheckedNodes() {
      return this.$refs.tree.getCheckedNodes()[0]
    },
    currentChange(currentNode) {
      this.getTreeData(currentNode)
    }
  }
}
</script>
<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .el-tree .el-tree-node .is-leaf + .el-checkbox .el-checkbox__inner{display: none;}
  .el-tree .el-tree-node .el-checkbox .el-checkbox__inner{display: inline-block;}
</style>

