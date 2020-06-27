<template>
  <div class="app-container">
    <el-drawer
      title="条件查询"
      :visible.sync="searchDrawer"
      direction="rtl"
      :before-close="handleClose"
    >
      <el-form :model="searchMap" label-position="left" label-width="80px" size="mini" style="padding:20px">
        <el-form-item label="分栏标题">
          <el-input v-model="searchMap.title" placeholder="标题" />
        </el-form-item>
        <el-form-item label="父级id">
          <el-input v-model="searchMap.pid" placeholder="父级id" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchMap.data_flag" placeholder="状态" clearable @change="fetchData">
            <el-option
              v-for="item in dataFlagList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="fetchData">查询</el-button>
      </el-form>
    </el-drawer>
    <el-button type="primary" @click="searchDrawer=true">条件查询</el-button>
    <el-button type="primary" @click="handleSave">添加</el-button>
    <el-table :data="list" height="500">
      <el-table-column align="center" label="排序id" prop="ord" />
      <el-table-column align="center" label="id" prop="id" />
      <el-table-column align="center" label="父级id" prop="pid" />
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
      <el-table-column align="center" label="操作" fixed="right" width="300">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button v-if="scope.row.data_flag===0" type="success" size="small" @click="putOn(scope.row.id)">上架</el-button>
          <el-button v-else type="danger" size="small" @click="deleteById(scope.row.id)">下架</el-button>
          <el-button type="primary" size="small" @click="getSpus(scope.row.id)">SPUS</el-button>
          <el-button type="primary" size="small" @click="getKeys(scope.row.id)">KEYS</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page.sync="page"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total"
      @size-change="fetchData"
      @current-change="fetchData"
    />
    <el-dialog
      title="编辑"
      :visible.sync="dialogEditVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="pojo" :model="pojo" label-width="80px" size="mini">
        <el-form-item label="排序编号">
          <el-input-number v-model="pojo.ord" placeholder="排序编号" />
        </el-form-item>
        <el-form-item label="父级id">
          <el-input v-model="pojo.pid" placeholder="父级id" />
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="pojo.title" placeholder="标题" />
        </el-form-item>
        <el-button type="success" @click="updateById('pojo')">确定</el-button>
        <el-button type="primary" @click="dialogEditVisible=false ">取消</el-button>
      </el-form>
    </el-dialog>
    <el-dialog
      title="添加"
      :visible.sync="dialogAddVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="pojo" :model="pojo" label-width="80px" size="mini">
        <el-form-item label="排序编号">
          <el-input-number v-model="pojo.ord" placeholder="数字倒叙" />
        </el-form-item>
        <el-form-item label="父级id">
          <el-input v-model="pojo.pid" placeholder="若为顶级输入0" />
        </el-form-item>
        <el-form-item label="标题">
          <el-input v-model="pojo.title" placeholder="标题" />
        </el-form-item>
        <el-button type="success" @click="save('pojo')">确定</el-button>
        <el-button type="primary" @click="dialogAddVisible=false ">取消</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import productCatesApi from '@/api/productCate'
export default {
  name: 'ProductCates',
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
      dataFlagList: [{ label: '上架', value: 1 }, { label: '下架', value: 0 }],
      list: [],
      searchMap: {},
      pojo: {},
      page: 1,
      pageSize: 10,
      total: 0,
      dialogEditVisible: false,
      dialogAddVisible: false,
      searchDrawer: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      productCatesApi.searchPage(this.searchMap, this.page, this.pageSize).then(res => {
        this.list = res.data.rows
        this.total = res.data.total
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
      productCatesApi.findById(id).then(res => {
        this.pojo = res.data
      })
      this.dialogEditVisible = true
    },
    handleClose(done) {
      done()
    },
    updateById(pojo) {
      this.$refs[pojo].validate((valid) => {
        if (valid) {
          productCatesApi.updateById(this.pojo.id, this.pojo).then((res) => {
            if (res.flag) {
              this.fetchData()
              this.dialogEditVisible = false
            }
            this.$message({
              message: res.message,
              type: res.flag ? 'success' : 'error'
            })
          })
        }
      })
    },
    handleSave() {
      this.pojo = {
        'ord': 1,
        'pid': 0
      }
      this.dialogAddVisible = true
    },
    save(pojo) {
      this.$refs[pojo].validate((valid) => {
        if (valid) {
          productCatesApi.save(this.pojo).then((res) => {
            if (res.flag) {
              this.fetchData()
              this.dialogAddVisible = false
            }
            this.$message({
              message: res.message,
              type: res.flag ? 'success' : 'error'
            })
          })
        }
      })
    },
    putOn(id) {
      this.$confirm('确认上架吗？')
        .then(_ => {
          productCatesApi.putOn(id).then(res => {
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
          productCatesApi.deleteById(id).then(res => {
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
    getSpus(id) {
      this.$router.push({ name: 'Spus', query: { cate_id: id }})
    },
    getKeys(id) {
      this.$router.push({ name: 'Keys', query: { cate_id: id }})
    }
  }
}
</script>
