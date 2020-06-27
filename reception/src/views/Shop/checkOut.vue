<template>
  <div>
    <!--Page Title-->
    <section
      class="page-title"
      style="background-image:url(static/images/background/34.jpg)"
    >
      <div class="auto-container">
        <h1>Checkout</h1>
        <ul class="page-breadcrumb">
          <li>
            <router-link tag="a" :to="{name: 'Home'}">home</router-link>
          </li>
          <li>Checkout</li>
        </ul>
      </div>
    </section>
    <!--End Page Title-->
    <!--CheckOut Page-->
    <section class="checkout-page">
      <div class="auto-container">
        <!--Default Links-->
        <div class="default-links">
          <div class="message-box with-icon info">
            <div class="icon-box">
              <span class="icon fa fa-info"></span>
            </div>
            Have a coupon? <a href="#">Click here to enter your code</a>
          </div>
        </div>
        <!--Checkout Details-->
        <div class="checkout-form">
            <div class="row clearfix">
              <!--Column-->
              <div class="column col-lg-6 col-md-12 col-sm-12">
                <div class="inner-column">
                  <div class="sec-title">
                    <h3>Billing details</h3>
                  </div>
                  <!--Form Group-->
                  <el-form :model="pojo" :rules="rules" ref="pojo">
                    <el-form-item label="First name" class="form-group" prop="recevicer">
                      <el-input v-model="pojo.recevicer" placeholder="接收名称"></el-input>
                    </el-form-item>
                    <el-form-item label="Address" class="form-group" prop="recevicer_address">
                      <el-input type="textarea" v-model="pojo.recevicer_address" placeholder="地址"></el-input>
                    </el-form-item>
                    <el-form-item label="预留手机号" class="form-group" prop="recevicer_phone">
                      <el-input v-model="pojo.recevicer_phone" placeholder="预留手机"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
        </div>
        <!--End Checkout Details-->
        <!--Order Box-->
        <div class="order-box">
          <table>
            <thead>
              <tr>
                <th class="product-name">Product</th>
                <th class="product-discount">Discount</th>
                <th class="product-total">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!cart.length" class="cart-item isEmpty">
                <td colspan="3">当前购物车空空如也</td>
              </tr>
              <tr v-else  v-for="item in cart" :key="item.sku_id" class="cart-item" >
                <td class="product-name">
                  {{ item.product_title }}&nbsp;
                  <strong class="product-quantity">&times; {{ item.num }}</strong>
                </td>
                <td class="product-discount">
                  <span class="discount">{{ item.discount }}</span>
                </td>
                <td class="product-total">
                  <span class="woocommerce-Price-amount amount">
                    <!-- <span class="woocommerce-Price-currencySymbol">￥</span> -->
                    <span :class="
                            item.discount !== 1.0
                              ? 'item-amount line-through'
                              : 'item-amount'" >￥{{ item.origin_price }}</span>
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
                  <span class="amount">￥{{ total }}</span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <!--End Order Box-->
        <!--Payment Box-->
        <div class="payment-box">
          <div class="upper-box">
            <!--Payment Options-->
            <div class="payment-options">
              <ul>
                <li>
                  <div class="radio-option">
                    <input
                      type="radio"
                      name="payment-group"
                      id="payment-2"
                      checked=""
                    />
                    <label for="payment-2">
                      <strong>Direct Bank Transfer</strong>
                      <span class="small-text"
                        >Make your payment directly into our bank account.
                        Please use your Order ID as the payment reference. Your
                        order won’t be shipped until the funds have cleared in
                        our account.</span
                      ></label
                    >
                  </div>
                </li>
                <li>
                  <div class="radio-option">
                    <input type="radio" name="payment-group" id="payment-1" />
                    <label for="payment-1">
                      <strong>Check Payments</strong>
                      <span class="small-text"
                        >Make your payment directly into our bank account.
                        Please use your Order ID as the payment reference. Your
                        order won’t be shipped until the funds have cleared in
                        our account.</span
                      ></label
                    >
                  </div>
                </li>
                <li>
                  <div class="radio-option">
                    <input type="radio" name="payment-group" id="payment-3" />
                    <label for="payment-3">
                      <strong>Cash on Delivery</strong>
                      <span class="small-text"
                        >Make your payment directly into our bank account.
                        Please use your Order ID as the payment reference. Your
                        order won’t be shipped until the funds have cleared in
                        our account.</span
                      ></label
                    >
                  </div>
                </li>
              </ul>
              <div class="text">
                Your personal data will be used to process your order, support
                your experience throughout this website, and for other purposes
                described in our <a href="#">privacy policy.</a>
              </div>
            </div>
          </div>
          <div class="lower-box">
            <a href="javascript:;" class="theme-btn">
              <span class="btn-title" @click="handlePush('pojo')">Place Order</span></a
            >
          </div>
        </div>
        <!--End Payment Box-->
      </div>
    </section>
    <!--End CheckOut Page-->
    <appFooter />
  </div>
</template>
<script>
import ordersApi from '@/api/order'
import appFooter from '@/layout/app-footer'
export default {
  name: 'CheckOut',
  components: { appFooter },
  data () {
    return {
      pojo: {},
      cart: [],
      total: 0.0,
      rules: {
        recevicer: [
          {required: true, message: '请输入接收名称', trigger: 'blur'}
        ],
        recevicer_address: [
          {required: true, message: '请输入接收地址', trigger: 'blur'}
        ],
        recevicer_phone: [
          {required: true, message: '请输入预留手机号', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    viewCart () {
      this.cart =
        sessionStorage.getItem('cart') !== null
          ? JSON.parse(sessionStorage.getItem('cart'))
          : this.cart
      //   sessionStorage.clear()
      console.log(this.cart)
    },
    checkTotal () {
      this.total = 0
      if (this.cart.length >= 1) {
        this.cart.forEach(item => {
          this.total += item.price * item.num
        })
        sessionStorage.setItem('total', this.total)
      }
      console.log(this.total)
    },
    handlePush (pojo) {
      this.pojo.product_money = this.total
      this.pojo.orderDetails = this.cart
      console.log(this.pojo)
      this.$refs[pojo].validate((valid) => {
        if (valid) {
          ordersApi.save(this.pojo).then((res) => {
            this.$alert(res.data, '当前订单号', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  message: res.message,
                  type: res.flag ? 'success' : 'error'
                })
                this.$router.push({ name: 'Home' })
              }
            })
          })
        }
      })
    }
  },
  created () {
    this.viewCart()
  },
  mounted () {
    this.checkTotal()
  }
}
</script>
<style scoped>
.isEmpty {
    width: 270px;
    height: 400px;
    line-height: 400px;
    text-align: center;
}
.line-through {
    text-decoration: line-through;
}
.now-price {
    color: #cf6e67;
}
</style>
