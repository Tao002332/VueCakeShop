<template>
  <div class="app-container">
    <el-form :model="searchMap" :inline="true">
      <el-form-item label="登录名称">
        <el-input v-model="searchMap.admin_name" placeholder="登录名称" />
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
      <el-button type="primary" @click="handleSave">添加</el-button>
    </el-form>
    <br>
    <el-table :data="list" height="500">
      <el-table-column align="center" label="ID" prop="id" width="180px" />
      <el-table-column align="center" label="登录名称" prop="admin_name" width="180px">
        <template slot-scope="scope">
          <el-tag type="primary" disable-transitions>
            {{ scope.row.admin_name }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="密码" prop="password" width="300px" :show-overflow-tooltip="true" />
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
      <el-table-column align="center" label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button v-if="scope.row.data_flag===0" type="success" size="small" @click="unseal(scope.row.id)">解禁</el-button>
          <el-button v-else type="danger" size="small" @click="deleteByUid(scope.row.id)">删除</el-button>
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
      <el-form ref="pojo" :model="pojo" label-width="80px" size="mini" :rules="rules">
        <el-form-item label="登录名称" prop="admin_name">
          <el-input v-model="pojo.admin_name" placeholder="登录名称" />
        </el-form-item>
        <el-form-item label="登录名称" prop="data_flag">
          <el-select v-model="pojo.data_flag" placeholder="状态">
            <el-option
              v-for="item in dataFlagList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-button type="success" @click="updateByUid('pojo')">确定</el-button>
        <el-button type="primary" @click="dialogEditVisible=false ">取消</el-button>
      </el-form>
    </el-dialog>
    <el-dialog
      title="添加"
      :visible.sync="dialogAddVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="pojo" :model="pojo" label-width="80px" size="mini" :rules="rules">
        <el-form-item label="登录名称" prop="admin_name">
          <el-input v-model="pojo.admin_name" placeholder="登录名称" />
        </el-form-item>
        <el-form-item label="状态" prop="data_flag">
          <el-select v-model="pojo.data_flag" placeholder="状态">
            <el-option
              v-for="item in dataFlagList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="pojo.password" type="password" placeholder="密码" />
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input v-model="pojo.checkPassword" type="password" placeholder="确认密码" />
        </el-form-item>
        <el-button type="success" @click="save('pojo')">确定</el-button>
        <el-button type="primary" @click="dialogAddVisible=false ">取消</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import adminsApi from '@/api/admin'
export default {
  name: 'Admins',
  filters: {
    filterDataFlag(value) {
      switch (value) {
        case 1: return '正常'
        case 0: return '封禁'
        case -1: return '未激活'
      }
    },
    formatterDate(value) {
      return new Date(value).toLocaleString()
    }
  },
  data() {
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.pojo.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      dataFlagList: [{ label: '正常', value: 1 }, { label: '已封禁', value: 0 }, { label: '未激活', value: -1 }],
      list: [],
      page: 1,
      pageSize: 10,
      total: 0,
      searchMap: {},
      pojo: {},
      dialogEditVisible: false,
      dialogAddVisible: false,
      rules: {
        admin_name: [
          { required: true, message: '输入登录名称', trigger: 'blur' },
          { min: 5, max: 20, message: '最少5位 最多20位', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 20, message: '最少5位 最多20位', trigger: 'blur' }
        ],
        data_flag: [
          { required: true, message: '请选择一个权限', trigger: 'change' }
        ],
        checkPassword: [{ validator: validatePass2, trigger: 'change' }]
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      adminsApi.searchPage(this.searchMap, this.page, this.pageSize).then(res => {
        this.list = res.data.rows
        this.total = res.data.total
      })
    },
    dataFlagType(data_flag) {
      if (data_flag === 1) {
        return 'success'
      } else if (data_flag === 0) {
        return 'danger'
      } else {
        return 'primary'
      }
    },
    handleEdit(id) {
      adminsApi.findByUid(id).then(res => {
        this.pojo = res.data
      })
      this.dialogEditVisible = true
    },
    handleClose(done) {
      done()
    },
    updateByUid(pojo) {
      this.$refs[pojo].validate((valid) => {
        if (valid) {
          adminsApi.updateByUid(this.pojo.id, this.pojo).then((res) => {
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
      this.pojo = {}
      this.dialogAddVisible = true
    },
    save(pojo) {
      this.$refs[pojo].validate((valid) => {
        if (valid) {
          adminsApi.save(this.pojo).then((res) => {
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
    unseal(id) {
      this.$confirm('确认解封？')
        .then(_ => {
          adminsApi.unseal(id).then(res => {
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
    deleteByUid(id) {
      this.$confirm('确认删除？')
        .then(_ => {
          adminsApi.deleteByUid(id).then(res => {
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
