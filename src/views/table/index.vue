<template>
  <div class="app-container">
      <!-- 上传文件 -->
    <el-upload
      class="upload-demo"
      action="api/excel/upload"
      :on-change="handleChange"
      :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传xls\xlsx文件</div>
    </el-upload>

      <!-- 获取sheet，分别展示对应的下拉框 -->
    <el-form label-position="right" label-width="80px">
      <el-form-item v-for="(item, index) in sheetData" :label="item.sheetName" :key="item.sheetName">
        <el-select v-model="value[index]" @change="((val)=>{change(val, item.sheetName)})" placeholder="请选择">
          <el-option
            v-for="t in item.tableList"
            :key="t.label"
            :label="t.label"
            :value="t.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="sheetData && sheetData.length > 0">
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getFields } from '@/api/excel'

export default {
  data() {
    return {
      fileList: [],
      sheetData: [],
      value: [],
      sheetParams: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
    },
    change(val, sheetName) {
      console.log(val, sheetName)
      if (this.sheetParams && this.sheetParams.length === 0) {

      }
      this.sheetParams.forEach(sheet => {
        // 如果已经选择下拉框，则
        if (sheet['sheetName'] === sheetName) {
          sheet['fields'] = val
        }
      })
    },
    handleChange(file, fileList) {
      if (file.response) {
        getFields().then(res => {
          if (res.success) {
            const datas = []
            res.data.forEach(d => {
              datas.push({
                label: d.tableName + '(' + d.fieldNames + ')',
                value: d.fieldList
              })
            })
            file.response.data.forEach(sheetName => {
              this.sheetData.push({
                sheetName: sheetName,
                tableList: datas
              })
            })
          }
        })
      }
      // this.fileList = fileList.slice(-3)
    },
    onSubmit() {
      console.log(this.value)
      console.log('submit!')
    }
  }
}
</script>
