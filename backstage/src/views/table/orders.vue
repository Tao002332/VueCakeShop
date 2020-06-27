<template>
  <div class="app-container">
    <el-button type="primary" @click="searchDrawer=true">条件查询</el-button>
    <el-drawer
      title="条件查询"
      :visible.sync="searchDrawer"
      direction="rtl"
      :before-close="handleClose"
    >
      <el-form :model="searchMap" label-position="left" label-width="80px" size="mini" style="padding:20px">
        <el-form-item label="订单号">
          <el-input v-model="searchMap.order_no" placeholder="订单号" />
        </el-form-item>
        <el-form-item label="用户id">
          <el-input v-model="searchMap.user_id" placeholder="用户id" />
        </el-form-item>
        <el-form-item label="订单状态">
          <el-select v-model="searchMap.order_status" placeholder="订单状态" clearable @change="fetchData">
            <el-option
              v-for="item in orderStatusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="总价范围">
          <div class="block">
            <el-slider
              v-model="searchMap.product_moneyRange"
              range
              show-stops
              :min="0"
              :max="1000"
              :step="1"
            />
          </div>
        </el-form-item>
        <el-form-item label="收货方式">
          <el-select v-model="searchMap.deliver_type" placeholder="收货方式" clearable @change="fetchData">
            <el-option
              v-for="item in deliverTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="searchMap.recevicer_phone" type="phone" placeholder="订单号" />
        </el-form-item>
        <el-form-item label="是否有效">
          <el-select v-model="searchMap.data_flag" placeholder="是否有效" clearable @change="fetchData">
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
    <el-table :data="list" height="700">
      <el-table-column align="center" label="id" prop="id" width="180px" />
      <el-table-column align="center" label="订单号" prop="order_no" width="180px" />
      <el-table-column align="center" label="用户id" prop="user_id" width="180px">
        <template slot-scope="scope">
          {{ scope.row.user_id==-1?'游客': scope.row.user_id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单有效标志" prop="data_flag" width="180px">
        <template slot-scope="scope">
          <el-tag
            :type="dataFlagType(scope.row.data_flag)"
            disable-transitions
          >{{ scope.row.data_flag | filterDataFlag }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单状态" prop="order_status" width="180px">
        <template slot-scope="scope">
          <el-tag
            type="warning"
            disable-transitions
          >{{ scope.row.order_status | filterOrderStatus }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品总价" prop="product_money" width="180px" />
      <el-table-column align="center" label="收货方式" prop="deliver_type" width="180px">
        <template slot-scope="scope">
          <el-tag
            type="info"
            disable-transitions
          >{{ scope.row.deliver_type |filterDeliverType }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="收货人手机号" prop="recevicer_phone" width="180px" />
      <el-table-column align="center" label="创建时间" prop="created_at" width="220px">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.created_at | formatterDate }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="修改时间" prop="updated_at" width="220px">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.updated_at | formatterDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button v-if="scope.row.data_flag===1" type="danger" size="small" @click="deleteById(scope.row.id)">删除</el-button>
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
      title="查看详细 实际购买价格"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="70%"
    >
      <el-table
        :data="orderDetails"
        :summary-method="getSummaries"
        show-summary
      >
        <el-table-column align="center" label="编号" prop="id" width="180px" />
        <el-table-column align="center" label="标题" prop="product_title" width="180px" />
        <el-table-column align="center" label="图片" width="300px">
          <template slot-scope="scope">
            <el-image :src="scope.row.product_img">
              <div slot="placeholder" class="image-slot">
                加载中<span class="dot">...</span>
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column align="center" label="价格" prop="price" width="180px" />
        <el-table-column align="center" label="数量" prop="num" width="180px" />
      </el-table>
      <br>
      <el-button type="primary" @click="dialogVisible=false">返回</el-button>
    </el-dialog>
  </div>
</template>

<script>
import ordersApi from '@/api/order'
export default {
  name: 'Orders',
  filters: {
    filterDataFlag(value) {
      switch (value) {
        case 1: return '有效'
        case 0: return '删除'
      }
    },
    formatterDate(value) {
      return new Date(value).toLocaleString()
    },
    filterDeliverType(value) {
      switch (value) {
        case 1: return '自提'
        case 0: return '送货上门'
      }
    },
    filterOrderStatus(value) {
      switch (value) {
        case -3: return '用户拒收'
        case -2: return '未付款的订单'
        case -1: return '用户取消'
        case 0: return '待发货'
        case 1: return '配送中'
        case 2: return '用户确认收货'
      }
    }
  },
  data() {
    return {
      dataFlagList: [
        { label: '有效', value: 1 },
        { label: '删除', value: -1 }
      ],
      deliverTypeList: [
        { label: '自提', value: 1 },
        { label: '送货上门', value: 0 }
      ],
      orderStatusList: [
        { label: '用户拒收', value: -3 },
        { label: '未付款的订单', value: -2 },
        { label: '用户取消', value: -1 },
        { label: '待发货', value: 0 },
        { label: '配送中', value: 1 },
        { label: '用户确认收货', value: 2 }
      ],
      list: [],
      page: 1,
      pageSize: 10,
      total: 0,
      searchMap: {},
      pojo: {},
      orderDetails: [],
      searchDrawer: false,
      dialogVisible: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      ordersApi.searchPage(this.searchMap, this.page, this.pageSize).then(res => {
        this.list = res.data.rows
        this.total = res.data.total
      })
    },
    dataFlagType(data_flag) {
      if (data_flag === 1) {
        return 'success'
      } else {
        return 'primary'
      }
    },
    deleteById(id) {
      this.$confirm('确认删除？')
        .then(_ => {
          ordersApi.deleteById(id).then(res => {
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
    handleClose(done) {
      done()
    },
    handleEdit(id) {
      ordersApi.findById(id).then(res => {
        this.pojo = res.data.order
        this.orderDetails = res.data.orderDetails
      })
      this.dialogVisible = true
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价'
          return
        }
        sums[index] = ''
        if (index === columns.length - 1) {
          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            const price = data.map(item => Number(item['price']))
            const num = data.map(item => Number(item['num']))
            var indexSum = 0
            for (var i = 0; i < price.length; i++) {
              indexSum += price[i] * num[i]
            }
            sums[index] = indexSum + ' 元'
          } else {
            sums[index] = ''
          }
        }
      })
      return sums
    }
  }
}
</script>
