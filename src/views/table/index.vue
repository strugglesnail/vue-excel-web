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
      <el-form-item v-for="item in sheetData" :label="item" :key="item">
        <!--<el-input v-model="item"></el-input>-->
        1111111111
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
      sheetData: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
    },
    handleChange(file, fileList) {
      if (file.response) {
        this.sheetData = file.response.data
        getFields().then(res => {
          if (res.success) {
            const datas = []
            res.data.forEach(d => {
              datas.push({
                label: ''
              })
            })

          }
        })
      }
      // this.fileList = fileList.slice(-3)
    }
  }
}
</script>
