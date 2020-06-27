<!--  -->
<template>
<div>
    <!--Page Title-->
    <section
      class="page-title"
      style="background-image:url(static/images//background/34.jpg)"
    >
      <div class="auto-container">
        <h1>OrderSearch</h1>
        <ul class="page-breadcrumb">
          <li><router-link :to="{ name: 'Home' }">Home</router-link></li>
          <li>OrderSearch</li>
        </ul>
      </div>
    </section>
    <!--End Page Title-->
    <!--Login Section-->
    <section class="login-section">
      <div class="auto-container">
        <!-- Login Form -->
        <div class="login-form">
          <h2>OrderSearch</h2>
          <!--Login Form-->
          <el-form :model="pojo" ref="pojo" :rules="rules">
            <el-form-item label="订单号" prop="order_no">
                <el-input v-model="pojo.order_no" placeholder="订单号"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="recevicer_phone">
                <el-input v-model="pojo.recevicer_phone" placeholder="手机号"></el-input>
            </el-form-item>
            <el-button type="primary" @click="findOrderByOrderNoAndPhone('pojo')">查询订单</el-button>
          </el-form>
        </div>
        <!--End Login Form -->
        <br>
        <div class="order-box" v-if="order.order_no">
          <div style="text-align:center">下单时间{{ order.created_at | formatterDate }} | 订单状态 {{ order.order_status | filterOrderStatus }} 送货方式 {{ order.deliver_type | filterDeliverType }} </div>
          <div style="text-align:center">商品订单详情</div>
          <table>
            <thead>
              <tr>
                <th class="product-name">Product</th>
                <th class="product-discount">Num</th>
                <th class="product-total">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!orderDetails.length" class="cart-item isEmpty">
                <td colspan="3" align="center">订单为空</td>
              </tr>
              <tr v-else  v-for="item in orderDetails" :key="item.sku_id" class="cart-item" >
                <td class="product-name">
                  {{ item.product_title }}&nbsp;
                </td>
                <td class="product-discount">
                  <strong class="product-quantity">&times; {{ item.num }}</strong>
                </td>
                <td class="product-total">
                  <span class="woocommerce-Price-amount amount">
                    <!-- <span class="woocommerce-Price-currencySymbol">￥</span> -->
                        <span class="now-price">￥{{ item.price }}</span>
                     </span>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="cart-subtotal">
                <th>Subtotal</th>
                <td></td>
                <td>
                  <span class="amount">￥{{ order.product_money }}</span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
    <!--End Login Section-->
    <appFooter />
  </div>
</template>

<script>
import appFooter from '@/layout/app-footer'
import ordersApi from '@/api/order'
export default {
  name: 'Order',
  components: { appFooter },
  filters: {
    formatterDate (value) {
      return new Date(value).toLocaleString()
    },
    filterDeliverType (value) {
      switch (value) {
        case 1: return '自提'
        case 0: return '送货上门'
      }
    },
    filterOrderStatus (value) {
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
  data () {
    return {
      pojo: {},
      order: {},
      orderDetails: [],
      rules: {
        order_no: [
          {required: true, message: '请输入订单号', trigger: 'blur'}
        ],
        recevicer_phone: [
          {required: true, message: '请输入预留手机号', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    findOrderByOrderNoAndPhone (pojo) {
      this.$refs[pojo].validate((valid) => {
        if (valid) {
          ordersApi.findOrderByOrderNoAndPhone(this.pojo).then(res => {
            this.order = res.data.order
            this.orderDetails = res.data.orderDetails
            console.log(this.order)
          })
        }
      })
    }
  },
  // 生命周期 - 创建完成（访问当前this实例）
  created () {

  },
  // 生命周期 - 挂载完成（访问DOM元素）
  mounted () {

  }
}
</script>
<style scoped>
/* @import url(); 引入css类 */

</style>
