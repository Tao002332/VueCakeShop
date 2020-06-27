<template>
  <div class="app-container">
    <el-form :model="searchMap" :inline="true">
      <el-form-item label="登录名称">
        <el-input v-model="searchMap.user_name" placeholder="登录名称" />
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
    <br>
    <el-table :data="list" height="500">
      <el-table-column align="center" label="ID" prop="id" width="180px" />
      <el-table-column align="center" label="登录名称" prop="user_name" width="180px">
        <template slot-scope="scope">
          <el-tag type="primary" disable-transitions>
            {{ scope.row.user_name }}
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
      <el-table-column align="center" label="昵称" prop="nickname" width="300px" />
      <el-table-column align="center" label="邮箱" prop="email" width="300px" />
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
      <el-table-column align="center" label="操作" fixed="right" width="100">
        <template slot-scope="scope">
          <el-button v-if="scope.row.data_flag===1" type="primary" size="small" @click="forbid(scope.row.id)">封禁</el-button>
          <el-button v-else-if="scope.row.data_flag===0" type="success" size="small" @click="unseal(scope.row.id)">解禁</el-button>
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
  </div>
</template>

<script>
import usersApi from '@/api/user'
export default {
  name: 'User',
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
    return {
      dataFlagList: [{ label: '正常', value: 1 }, { label: '已封禁', value: 0 }, { label: '未激活', value: -1 }],
      list: [],
      page: 1,
      pageSize: 10,
      total: 0,
      searchMap: {},
      pojo: {},
      dialogEditVisible: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      usersApi.searchPage(this.searchMap, this.page, this.pageSize).then(res => {
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
    formatterDate(row, column) {
      return new Date(row[column.property]).toLocaleString()
    },
    unseal(id) {
      this.$confirm('确认解封？')
        .then(_ => {
          usersApi.unseal(id).then(res => {
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
    forbid(id) {
      this.$confirm('确认封禁？')
        .then(_ => {
          usersApi.forbid(id).then(res => {
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
  },
  deleteByUid(id) {
    this.$confirm('确认删除？')
      .then(_ => {
        usersApi.deleteByUid(id).then(res => {
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
</script>
