<template>
  <div class="app-container">
    <div v-if="cates.title" align="center" style="color:red;font-size:40px">
      所属分栏名称：{{ cates.title }}
    </div>
    <br>
    <el-button type="primary" @click="handleSave()">新增</el-button>
    <br>
    <el-table :data="list" height="500">
      <el-table-column align="center" label="id" prop="id" width="180px" />
      <el-table-column align="center" label="标题" prop="title" width="180px">
        <template slot-scope="scope">
          <el-tag type="primary" disable-transitions>
            {{ scope.row.title }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        prop="data_flag"
        width="180px"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag
            :type="dataFlagType(scope.row.data_flag)"
            disable-transitions
          >{{ scope.row.data_flag | filterDataFlag }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间" prop="created_at" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.created_at | formatterDate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="修改时间" prop="updated_at" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.updated_at | formatterDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button v-if="scope.row.data_flag===0" type="success" size="small" @click="putOn(scope.row.id)">上架</el-button>
          <el-button v-else type="danger" size="small" @click="deleteById(scope.row.id)">下架</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <el-form ref="pojo" label-position="left" :model="pojo" label-width="80px" size="mini">
        <el-form-item label="标题">
          <el-input v-model="pojo.title" placeholder="标题" style="width: 80%;" />
        </el-form-item>
        <el-form-item
          v-for="(v,k) in values"
          :key="v.key"
          :label="'属性值'+k"
        >
          <el-input v-model="v.value" style="width: 80%;" placeholder="属性值" />
          <el-button @click.prevent="removeValue(k)">删除</el-button>
        </el-form-item>
        <el-button type="primary" size="small" @click.prevent="addValue">添加属性值</el-button>
        <el-button type="success" size="small" @click="saveOrUpdate('pojo')">确定</el-button>
        <el-button type="primary" size="small" @click="dialogVisible =false ">取消</el-button>
      </el-form>
    </el-dialog>

  </div>
</template>
<script>
import productCateApi from '@/api/productCate'
import propertyKeyApi from '@/api/propertyKey'
export default {
  name: 'PropertyKeys',
  filters: {
    filterDataFlag(value) {
      switch (value) {
        case 1: return '上架'
        case 0: return '下架'
      }
    },
    formatterDate(value) {
      return new Date(value).toLocaleString()
    }
  },
  data() {
    return {
      list: [],
      cate_id: 0,
      dialogVisible: false,
      title: '编辑',
      cates: {},
      pojo: {},
      values: [{ value: '', key: '' }]
    }
  },
  created() {
    this.cate_id = this.$route.query.cate_id !== undefined ? this.$route.query.cate_id : 0
    if (this.cate_id === 0) {
      this.$message({
        message: '请从分类处进入',
        type: 'error'
      })
      this.$router.push({ name: 'Cates' })
    } else {
      this.fetchData()
    }
  },
  methods: {
    fetchData() {
      productCateApi.getKeys(this.cate_id).then(res => {
        console.log(res.data)
        this.list = res.data.keys
        this.cates = res.data.cates
      })
    },
    dataFlagType(data_flag) {
      if (data_flag === 1) {
        return 'success'
      } else {
        return 'danger'
      }
    },
    handleEdit(id) {
      this.title = '编辑'
      propertyKeyApi.findById(id).then(res => {
        this.pojo = res.data.keys
        this.values = res.data.values.length === 0 ? this.values : res.data.values
      })
      this.dialogVisible = true
    },
    handleSave() {
      this.title = '保存'
      this.pojo = { cate_id: this.cate_id }
      this.values = [{ value: '', key: '' }]
      this.dialogVisible = true
    },
    handleClose(done) {
      done()
    },
    saveOrUpdate(pojo) {
      this.pojo.values = this.values
      this.$refs[pojo].validate((valid) => {
        if (valid) {
          if (this.title === '保存') {
            propertyKeyApi.save(this.pojo).then((res) => {
              if (res.flag) {
                this.fetchData()
                this.dialogVisible = false
              }
              this.$message({
                message: res.message,
                type: res.flag ? 'success' : 'error'
              })
            })
          } else {
            propertyKeyApi.updateById(this.pojo.id, this.pojo).then((res) => {
              if (res.flag) {
                this.fetchData()
                this.dialogVisible = false
              }
              this.$message({
                message: res.message,
                type: res.flag ? 'success' : 'error'
              })
            })
          }
        }
      })
    },
    removeValue(index) {
      if (index !== 0) {
        this.values.splice(index, 1)
      } else {
        this.$message({
          message: '一个属性名至少要一个属性值',
          type: 'error'
        })
      }
    },
    addValue() {
      this.values.push({
        value: '',
        key: Date.now()
      })
    },
    putOn(id) {
      this.$confirm('确认上架吗？')
        .then(_ => {
          propertyKeyApi.putOn(id).then(res => {
            if (res.flag) {
              this.fetchData()
            }
            this.$message({
              message: res.message,
              type: res.flag ? 'success' : 'error'
            })
          })
        })
        .catch(_ => {})
    },
    deleteById(id) {
      this.$confirm('确认下架吗？连同子级同样一起下架')
        .then(_ => {
          propertyKeyApi.deleteById(id).then(res => {
            if (res.flag) {
              this.fetchData()
            }
            this.$message({
              message: res.message,
              type: res.flag ? 'success' : 'error'
            })
          })
        })
        .catch(_ => {})
    }
  }
}
</script>
